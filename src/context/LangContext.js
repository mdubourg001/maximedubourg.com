import React, { useState, createContext, useEffect } from "react";

let defaultLang = null;
if (typeof Storage !== "undefined") {
  // if locale storage is supported
  defaultLang = window.localStorage.getItem("lang");
  if (!defaultLang) defaultLang = navigator.language || navigator.userLanguage;
} else {
  defaultLang = navigator.language || navigator.userLanguage;
}
export const LangContext = createContext(defaultLang);

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
