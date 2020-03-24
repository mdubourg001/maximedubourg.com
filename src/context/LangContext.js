import React, { useState, createContext, useEffect } from "react";

const defaultLang = "fr-FR";

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
