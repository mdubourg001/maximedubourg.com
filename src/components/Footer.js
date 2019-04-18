import React, { useContext } from "react";

import { LangContext } from "../context/LangContext";

const Footer = () => {
  const { lang, setLang } = useContext(LangContext);

  return (
    <div className="w-full text-center mt-20 mb-12">
      {lang === "fr-FR" && (
        <p className="text-grey-darker">
          Besoin de me contacter? E-mailez moi!
        </p>
      )}
      {lang !== "fr-FR" && (
        <p className="text-grey-darker">
          Want to get in touch? Throw me an email at
        </p>
      )}
      <br />
      <br />
      <b className="text-grey-darkest">maxime.dubourg@protonmail.com</b>
    </div>
  );
};

export default Footer;
