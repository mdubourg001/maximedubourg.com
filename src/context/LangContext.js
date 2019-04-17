import React, { useState, createContext } from "react";

const defaultLang = navigator.language || navigator.userLanguage;
export const LangContext = createContext(defaultLang);

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(defaultLang);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
