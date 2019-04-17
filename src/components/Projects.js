import React, { useMemo, useContext } from "react";

import { LangContext } from "../context/LangContext";
import getProjects from "../utils/projects";

const Projects = () => {
  const { lang, setLang } = useContext(LangContext);
  const projects = useMemo(() => getProjects(lang), [lang]);

  return (
    <div className="mt-20">
      {projects.map(project => (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <b className="text-grey-darkest border-b border-grey-darker mb-1">
              {project.name}
            </b>
            <div
              className="flex w-24 rounded ml-4 pb-1"
              style={{ height: "9px" }}
            >
              {project.languages.map(l => (
                <div
                  className={`hint--top hint--rounded h-full ${l.class}`}
                  aria-label={l.tooltip}
                  style={{ backgroundColor: l.color }}
                />
              ))}
            </div>
          </div>
          <small>{project.description}</small>
        </div>
      ))}

      <div className="flex justify-center mt-20">
        <a
          className="flex items-center bg-white no-underline text-black rounded-full px-4 py-2"
          target="_blank"
          href="https://github.com/mdubourg001?tab=repositories"
        >
          {lang === "fr-FR" && (
            <>
              <span className="jam text-xl jam-github-circle mr-2" />
              <small>Voir plus sur Github</small>
            </>
          )}
        </a>
      </div>
    </div>
  );
};

export default Projects;
