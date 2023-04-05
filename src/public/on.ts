import { ZalgoPromise } from "@krakenjs/zalgo-promise";

import { addRequestListener } from "../drivers";
import { WILDCARD } from "../conf";
import type {
  ServerOptionsType,
  HandlerType,
  CancelableType,
  OnType,
} from "../types";

const getDefaultServerOptions = (): ServerOptionsType => {
  return {};
};

export function on(
  name: string,
  options: ServerOptionsType | HandlerType,
  handler?: HandlerType
): ReturnType<OnType> {
  if (!name) {
    throw new Error("Expected name");
  }

  options = options || getDefaultServerOptions();
  if (typeof options === "function") {
    handler = options;
    options = getDefaultServerOptions();
  }

  if (!handler) {
    throw new Error("Expected handler");
  }

  const winOrProxyWin = options.window;
  const domain = options.domain || WILDCARD;

  const successHandler = handler || options.handler;
  const errorHandler =
    options.errorHandler ||
    ((err) => {
      throw err;
    });

  const requestListener = addRequestListener(
    {
      name,
      win: winOrProxyWin,
      domain,
    },
    {
      handler: successHandler,
      handleError: errorHandler,
    }
  );

  return {
    cancel() {
      requestListener.cancel();
    },
  };
}

type CancelableZalgoPromise<T> = ZalgoPromise<T> & {
  cancel: () => void;
};

type OnceHandler = CancelableZalgoPromise<{
  source: unknown;
  origin: string;
  data: Record<string, any>;
}>;

// TODO: Why is once in here and not in belter
export function once(
  name: string,
  options?: ServerOptionsType | HandlerType,
  handler?: HandlerType
): OnceHandler {
  options = options || getDefaultServerOptions();

  if (typeof options === "function") {
    handler = options;
    options = getDefaultServerOptions();
  }

  // @ts-expect-error promise is missing required properties on initialization
  const promise: OnceHanlder = new ZalgoPromise<{}>();
  // eslint-disable-next-line prefer-const
  let listener: CancelableType;

  options.errorHandler = (err) => {
    listener.cancel();
    void promise.reject(err);
  };

  listener = on(name, options, (event) => {
    listener.cancel();
    void promise.resolve(event);

    if (handler) {
      return handler(event);
    }
  });

  promise.cancel = listener.cancel;

  return promise;
}
