/* eslint-disable @typescript-eslint/member-ordering */
import type { $Values } from "utility-types";
import type {
  CrossDomainWindowType,
  DomainMatcher,
} from "@krakenjs/cross-domain-utils/dist/esm";
import {
  isSameDomain,
  isWindowClosed,
  closeWindow,
  getOpener,
  WINDOW_TYPE,
  isWindow,
  assertSameDomain,
  getFrameForWindow,
} from "@krakenjs/cross-domain-utils/dist/esm";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import {
  uniqueID,
  memoizePromise,
  noop,
  submitForm,
} from "@krakenjs/belter/dist/esm";
import type { CustomSerializedType } from "@krakenjs/universal-serialize/dist/esm";
import { serializeType } from "@krakenjs/universal-serialize/dist/esm";

import { SERIALIZATION_TYPE, METHOD } from "../conf";
import { windowStore, globalStore } from "../global";
import { getWindowInstanceID } from "../lib";
import type { SendType } from "../types";

function cleanupProxyWindows() {
  const idToProxyWindow = globalStore<ProxyWindow>("idToProxyWindow");

  for (const id of idToProxyWindow.keys()) {
    // @ts-expect-error should clean does not exist on void | ProxyWindow. Need to narrow
    if (idToProxyWindow.get(id).shouldClean()) {
      idToProxyWindow.del(id);
    }
  }
}

type SetLocationOptions = {
  method?: $Values<typeof METHOD>;
  body?: Record<string, string | boolean>;
};

type SerializedWindowType = {
  id: string;
  getType: () => ZalgoPromise<$Values<typeof WINDOW_TYPE>>;
  close: () => ZalgoPromise<void>;
  focus: () => ZalgoPromise<void>;
  isClosed: () => ZalgoPromise<boolean>;
  setLocation: (url: string, opts?: SetLocationOptions) => ZalgoPromise<void>;
  getName: () =>
    | ZalgoPromise<string | ZalgoPromise<string | undefined> | undefined>
    | undefined;
  setName: (arg0: string) => ZalgoPromise<void>;
  getInstanceID: () => ZalgoPromise<string>;
};

function getSerializedWindow(
  winPromise: ZalgoPromise<CrossDomainWindowType>,
  {
    send,
    id = uniqueID(),
  }: {
    send: SendType;
    id?: string;
  }
): SerializedWindowType {
  let windowNamePromise = winPromise.then((win: Window) => {
    if (isSameDomain(win)) {
      return assertSameDomain(win).name;
    }
  });

  const windowTypePromise = winPromise.then((window: Window) => {
    if (!isWindowClosed(window)) {
      return getOpener(window) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME;
    } else {
      throw new Error(`Window is closed, can not determine type`);
    }
  });

  windowNamePromise.catch(noop);
  windowTypePromise.catch(noop);

  const getName = () =>
    winPromise.then((win: Window) => {
      if (isWindowClosed(win)) {
        return;
      }

      if (isSameDomain(win)) {
        return assertSameDomain(win).name;
      }

      return windowNamePromise;
    });

  const getDefaultSetLocationOptions = () => {
    return {};
  };

  const setLocation = (
    href: string,
    opts: SetLocationOptions = getDefaultSetLocationOptions()
  ) =>
    winPromise.then((win: Window) => {
      const domain = `${window.location.protocol}//${window.location.host}`;
      const { method = METHOD.GET, body } = opts;

      if (href.startsWith("/")) {
        href = `${domain}${href}`;
      } else if (!/^https?:\/\//.exec(href) && !href.startsWith(domain)) {
        throw new Error(
          `Expected url to be http or https url, or absolute path, got ${JSON.stringify(
            href
          )}`
        );
      }

      if (method === METHOD.POST) {
        return getName().then((name) => {
          if (!name) {
            throw new Error(`Can not post to window without target name`);
          }

          submitForm({
            url: href,
            // @ts-expect-error getName can return other types besides string
            target: name,
            method,
            body,
          });
        });
      } else if (method === METHOD.GET) {
        if (isSameDomain(win)) {
          try {
            if (win.location && typeof win.location.replace === "function") {
              win.location.replace(href);
              return;
            }
          } catch (err) {
            // pass
          }
        }

        win.location = href;
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }
    });

  return {
    id,
    getType: () => {
      return windowTypePromise;
    },
    getInstanceID: memoizePromise(() =>
      winPromise.then((win) =>
        getWindowInstanceID(win, {
          send,
        })
      )
    ),
    close: () => winPromise.then(closeWindow),
    getName,
    focus: () =>
      winPromise.then((win) => {
        win.focus();
      }),
    isClosed: () =>
      winPromise.then((win) => {
        return isWindowClosed(win);
      }),
    // @ts-expect-error the object shape doesnt match type. in code we pass href but type expectes url
    setLocation,
    setName: (name) =>
      winPromise.then((win) => {
        const sameDomain = isSameDomain(win);
        const frame = getFrameForWindow(win);

        if (!sameDomain) {
          throw new Error(`Can not set name for cross-domain window: ${name}`);
        }

        assertSameDomain(win).name = name;

        if (frame) {
          frame.setAttribute("name", name);
        }

        windowNamePromise = ZalgoPromise.resolve(name);
      }),
  };
}

export class ProxyWindow {
  id: string | undefined;
  isProxyWindow = true;
  serializedWindow: SerializedWindowType;
  actualWindow: CrossDomainWindowType | null | undefined;
  actualWindowPromise: ZalgoPromise<CrossDomainWindowType>;
  send: SendType | undefined;
  name: string | undefined;

  constructor({
    send,
    win,
    serializedWindow,
  }: {
    win?: CrossDomainWindowType;
    serializedWindow?: SerializedWindowType;
    send: SendType;
  }) {
    this.actualWindowPromise = new ZalgoPromise();
    this.serializedWindow =
      serializedWindow ||
      getSerializedWindow(this.actualWindowPromise, {
        send,
      });

    globalStore("idToProxyWindow").set(this.getID(), this);
    if (win) {
      this.setWindow(win, {
        send,
      });
    }
  }

  getID(): string {
    return this.serializedWindow.id;
  }

  getType(): ZalgoPromise<$Values<typeof WINDOW_TYPE>> {
    return this.serializedWindow.getType();
  }

  isPopup(): ZalgoPromise<boolean> {
    return this.getType().then((type) => {
      return type === WINDOW_TYPE.POPUP;
    });
  }

  setLocation(
    href: string,
    opts?: SetLocationOptions
  ): ZalgoPromise<ProxyWindow> {
    return this.serializedWindow.setLocation(href, opts).then(() => this);
  }

  getName(): ZalgoPromise<string | null | undefined> {
    // @ts-expect-error getName's signature is crazy inconsistent with null handling unfortunately
    return this.serializedWindow.getName();
  }

  setName(name: string): ZalgoPromise<ProxyWindow> {
    return this.serializedWindow.setName(name).then(() => this);
  }

  close(): ZalgoPromise<ProxyWindow> {
    return this.serializedWindow.close().then(() => this);
  }

  focus(): ZalgoPromise<ProxyWindow> {
    const isPopupPromise = this.isPopup();
    const getNamePromise = this.getName();

    const reopenPromise = ZalgoPromise.hash({
      isPopup: isPopupPromise,
      name: getNamePromise,
    }).then(({ isPopup, name }) => {
      if (isPopup && name) {
        window.open("", name, "noopener");
      }
    });
    const focusPromise = this.serializedWindow.focus();

    return ZalgoPromise.all([reopenPromise, focusPromise]).then(() => this);
  }

  isClosed(): ZalgoPromise<boolean> {
    return this.serializedWindow.isClosed();
  }

  getWindow(): CrossDomainWindowType | null | undefined {
    return this.actualWindow;
  }

  setWindow(
    win: CrossDomainWindowType,
    {
      send,
    }: {
      send: SendType;
    }
  ) {
    this.actualWindow = win;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.actualWindowPromise.resolve(this.actualWindow);
    this.serializedWindow = getSerializedWindow(this.actualWindowPromise, {
      send,
      id: this.getID(),
    });
    windowStore("winToProxyWindow").set(win, this);
  }

  awaitWindow(): ZalgoPromise<CrossDomainWindowType> {
    return this.actualWindowPromise;
  }

  matchWindow(
    win: CrossDomainWindowType,
    {
      send,
    }: {
      send: SendType;
    }
  ): ZalgoPromise<boolean | ZalgoPromise<boolean>> {
    return ZalgoPromise.try(() => {
      if (this.actualWindow) {
        return win === this.actualWindow;
      }

      return ZalgoPromise.hash({
        proxyInstanceID: this.getInstanceID(),
        knownWindowInstanceID: getWindowInstanceID(win, {
          send,
        }),
      }).then(({ proxyInstanceID, knownWindowInstanceID }: any) => {
        const match = proxyInstanceID === knownWindowInstanceID;

        if (match) {
          this.setWindow(win, {
            send,
          });
        }

        return match;
      });
    });
  }

  unwrap(): CrossDomainWindowType | ProxyWindow {
    return this.actualWindow || this;
  }

  getInstanceID(): ZalgoPromise<string> {
    return this.serializedWindow.getInstanceID();
  }

  shouldClean(): boolean {
    return Boolean(this.actualWindow && isWindowClosed(this.actualWindow));
  }

  serialize(): SerializedWindowType {
    return this.serializedWindow;
  }

  static unwrap(
    win: CrossDomainWindowType | ProxyWindow
  ): CrossDomainWindowType | ProxyWindow {
    // @ts-expect-error unwrap exists on ProxyWindow but not Window and type is not narrowed
    return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
  }

  static serialize(
    win: CrossDomainWindowType | ProxyWindow,
    {
      send,
    }: {
      send: SendType;
    }
  ): SerializedWindowType {
    cleanupProxyWindows();
    return ProxyWindow.toProxyWindow(win, {
      send,
    }).serialize();
  }

  static deserialize(
    serializedWindow: SerializedWindowType,
    {
      send,
    }: {
      send: SendType;
    }
  ): ProxyWindow {
    cleanupProxyWindows();
    return (
      globalStore<ProxyWindow>("idToProxyWindow").get(serializedWindow.id) ||
      new ProxyWindow({
        serializedWindow,
        send,
      })
    );
  }

  static isProxyWindow(obj: CrossDomainWindowType | ProxyWindow): boolean {
    // @ts-expect-error TODO: look into this
    return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
  }

  static toProxyWindow(
    win: CrossDomainWindowType | ProxyWindow,
    {
      send,
    }: {
      send: SendType;
    }
  ): ProxyWindow {
    cleanupProxyWindows();

    if (ProxyWindow.isProxyWindow(win)) {
      // @ts-expect-error TODO: look into this
      return win;
    }

    // @ts-expect-error - TODO: look into this
    const actualWindow: CrossDomainWindowType = win;
    return (
      windowStore<ProxyWindow>("winToProxyWindow").get(actualWindow) ||
      new ProxyWindow({
        win: actualWindow,
        send,
      })
    );
  }
}

export type SerializedWindow = CustomSerializedType<
  typeof SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW,
  SerializedWindowType
>;

export function serializeWindow(
  destination: CrossDomainWindowType | ProxyWindow,
  domain: DomainMatcher,
  win: CrossDomainWindowType,
  {
    send,
  }: {
    send: SendType;
  }
): SerializedWindow {
  return serializeType(
    SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW,
    ProxyWindow.serialize(win, {
      send,
    })
  );
}

export function deserializeWindow(
  source: CrossDomainWindowType | ProxyWindow,
  origin: string,
  win: SerializedWindowType,
  {
    send,
  }: {
    send: SendType;
  }
): ProxyWindow {
  return ProxyWindow.deserialize(win, {
    send,
  });
}
