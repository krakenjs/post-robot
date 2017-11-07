
declare var __IE_POPUP_SUPPORT__ : boolean;
declare var __TEST__ : boolean;
declare var __ALLOW_POSTMESSAGE_POPUP__ : boolean;

export type CrossDomainWindowType = {|
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void,
    focus : () => void,
    frames : Array<CrossDomainWindowType>,
    opener ? : CrossDomainWindowType,
    parent : CrossDomainWindowType,
    length : number,
    postMessage : (string, string) => void
|};

export type SameDomainWindowType = Object & {
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void,
    focus : () => void,
    XMLHttpRequest : typeof XMLHttpRequest,
    document : Document,
    navigator : {
        userAgent : string,
        mockUserAgent? : string
    }
};