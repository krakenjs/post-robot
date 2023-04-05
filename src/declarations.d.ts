declare global {
  let __POST_ROBOT__: {
    __GLOBAL_KEY__: string;
    __AUTO_SETUP__: boolean;
    __IE_POPUP_SUPPORT__: boolean;
    __GLOBAL_MESSAGE_SUPPORT__: boolean;
    __SCRIPT_NAMESPACE__: boolean;
  };

  //disable this one for now due to lint error in Belter
  // let __TEST__: boolean;

  let __DEBUG__: boolean;
}

export {};
