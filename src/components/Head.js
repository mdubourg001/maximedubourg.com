import React, { useContext } from "react";

import { LangContext } from "../context/LangContext";
import me from "../assets/me.png";

const Head = props => {
  const { lang, setLang } = useContext(LangContext);

  return (
    <>
      <div className="flex justify-center items-center floating-light-animation">
        <img className="h-24 mr-4" src={me} alt="" />
        <h1 className="font-cursive text-shadow text-2xl">Maxime Dubourg</h1>
      </div>

      <div className="flex items-center justify-center mt-4">
        <div className="mr-4">
          <a
            className="flex items-center justify-center text-grey-darkest text-xs no-underline ml-2"
            target="_blank"
            href="https://github.com/mdubourg001?tab=repositories"
          >
            <span className="jam text-xl jam-github-circle" />
            <span className="hidden sm:block ml-2">/mdubourg001</span>
          </a>
        </div>
        <div className="ml-4 mr-4">
          <a
            className="flex items-center justify-center text-grey-darkest text-xs no-underline ml-1"
            target="_blank"
            href="https://twitter.com/_damnhotuser"
          >
            <span className="jam text-xl jam-twitter-circle" />
            <span className="hidden sm:block ml-1">@_damnhotuser</span>
          </a>
        </div>

        <div className="flex items-center">
          <small className="mr-4">|</small>
          <small
            className={`mr-1 ${lang !== "fr-FR" &&
              "opacity-50"} cursor-pointer hover:opacity-100`}
            onClick={() => setLang("fr-FR")}
          >
            🇫🇷
          </small>
          <small
            className={`ml-1 ${lang === "fr-FR" &&
              "opacity-50"} cursor-pointer hover:opacity-100`}
            onClick={() => setLang("en-US")}
          >
            🇺🇸
          </small>
        </div>
      </div>

      <h2 className="w-full text-center leading-normal font-normal mt-20 ">
        {lang === "fr-FR" && (
          <>
            Développeur web{" "}
            <span
              className="font-bold cursor-default hint--top hint--rounded"
              aria-label="⚛️ Javascript"
              style={{ color: "#F0DF5A" }}
            >
              &nbsp;full
            </span>
            -
            <span
              className="font-bold cursor-default hint--top hint--rounded"
              aria-label="🐍 Django"
              style={{ color: "#3972A4" }}
            >
              stack
            </span>
            <br />à{" "}
            <span
              className="font-cursive font-bold"
              style={{ color: "#652238" }}
            >
              &nbsp;Bordeaux
            </span>
            .
          </>
        )}

        {lang !== "fr-FR" && (
          <>
            {" "}
            <span
              className="font-bold cursor-default hint--top hint--rounded"
              aria-label="⚛️ Javascript"
              style={{ color: "#F0DF5A" }}
            >
              Full
            </span>
            -
            <span
              className="font-bold cursor-default hint--top hint--rounded"
              aria-label="🐍 Django"
              style={{ color: "#3972A4" }}
            >
              stack&nbsp;
            </span>
            web developer
            <br />
            from{" "}
            <span
              className="font-cursive font-bold"
              style={{ color: "#652238" }}
            >
              &nbsp;Bordeaux
            </span>
            .
          </>
        )}
      </h2>
    </>
  );
};

export default Head;
