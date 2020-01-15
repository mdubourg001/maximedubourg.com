import React from "react";

const getProjects = lang => [
  {
    name: "chaussette",
    gh_url: "https://github.com/mdubourg001/chaussette",
    description: {
      "fr-FR": (
        <>
          Un proxy NodeJS permettant de communiquer avec un serveur TCP depuis
          une WebSocket. 👀{" "}
          <a
            href="https://www.npmjs.com/package/chaussette"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#CA3837" }}
          >
            npm
          </a>
        </>
      ),
      "en-US": (
        <>
          A nodejs proxy to communicate with TCP servers from a browser's
          WebSocket.. 👀{" "}
          <a
            href="https://www.npmjs.com/package/chaussette"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#CA3837" }}
          >
            npm
          </a>
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "NodeJS",
        color: "#D4B73C",
        class: "w-full rounded-lg"
      }
    ]
  },
  {
    name: "react-infinite-list",
    gh_url: "https://github.com/mdubourg001/react-infinite-list",
    description: {
      "fr-FR": (
        <>
          Composant React permettant le rendu de listes dont les données sont
          fetchées lors du scrolling. 👀{" "}
          <a
            href="https://www.npmjs.com/package/@damnhotuser/react-infinite-list"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#CA3837" }}
          >
            npm
          </a>
        </>
      ),
      "en-US": (
        <>
          React component allowing render of on-scroll fetched data lists. 👀{" "}
          <a
            href="https://www.npmjs.com/package/@damnhotuser/react-infinite-list"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#CA3837" }}
          >
            npm
          </a>
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "Javascript (ReactJS)",
        color: "#F0DF5A",
        class: "w-full rounded-lg "
      }
    ]
  },
  {
    name: "(k)lean-canvas.com",
    gh_url: "https://github.com/mdubourg001/klean-canvas",
    description: {
      "fr-FR": (
        <>
          Outil en ligne de création de Lean Canvas. Permet un export (et
          import) au format JSON pour sauvegarde locale, ainsi qu'un export PNG
          pour partage ou présentation. De plus, votre travail est
          automatiquement sauvegardé dans le localStorage. 👀{" "}
          <a
            href="https://klean-canvas.com"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#FC8181" }}
          >
            klean-canvas.com
          </a>
        </>
      ),
      "en-US": (
        <>
          Online Lean Canvas creation tool. Allows JSON import/export for local
          saving, and PNG export for sharing. Moreover, your work is
          automatically saved in localStorage. 👀{" "}
          <a
            href="https://klean-canvas.com"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#FC8181" }}
          >
            klean-canvas.com
          </a>
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "Javascript (ReactJS)",
        color: "#F0DF5A",
        class: "w-full rounded-lg "
      }
    ]
  },
  {
    name: "regexplosion.io",
    gh_url: "https://github.com/mdubourg001/regexplosion",
    description: {
      "fr-FR": (
        <>
          <span className="text-grey-darker">
            (⚠️ Non prouvé et non complet, à utiliser à vos risques & périls)
          </span>
          <br />
          Générateur d'expressions régulières. 👀{" "}
          <a
            href="https://regexplosion.io"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#165EA3" }}
          >
            regexplosion.io
          </a>
        </>
      ),
      "en-US": (
        <>
          <span className="text-grey-darker">
            (⚠️ Not proved & not fully working, so use it at your own risks !)
          </span>
          <br />
          Regular expression visual generator. 👀{" "}
          <a
            href="https://regexplosion.io"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#165EA3" }}
          >
            regexplosion.io
          </a>
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "Javascript (VueJS)",
        color: "#F0DF5A",
        class: "w-full rounded-lg "
      }
    ]
  },
  {
    name: "leboncoin_spider",
    gh_url: "https://github.com/mdubourg001/leboncoin_spider",
    description: {
      "fr-FR": (
        <>
          Script configurable scrappant les offres du site Leboncoin.fr en vous
          envoyant des mails quand des offres répondant à vos critères
          apparaissent
        </>
      ),
      "en-US": (
        <>
          Configurable script scrapping Leboncoin.fr and sending you e-mails
          when new offers matching your criterias appear
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      { tooltip: "Python", color: "#3972A4", class: "w-full rounded-lg " }
    ]
  },
  {
    name: (
      <>
        cecech <small className="text-grey-darker">(wip.)</small>
      </>
    ),
    gh_url: "https://github.com/mdubourg001/cecech",
    description: {
      "fr-FR": (
        <>
          Jeu (runner-like) développé à l'occasion de la sortie de l'EP du
          musicien Bordelais, Cecech. 👀{" "}
          <a
            href="https://www.deezer.com/fr/artist/1203886"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#D4B73C" }}
          >
            deezer
          </a>
        </>
      ),
      "en-US": (
        <>
          Video game (runner-like) specially developed for the release of the EP
          of the musician from Bordeaux, Cecech. 👀{" "}
          <a
            href="https://www.deezer.com/fr/artist/1203886"
            target="_blank"
            className="underline font-bold"
            style={{ color: "#D4B73C" }}
          >
            deezer
          </a>
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "Javascript (PixiJS)",
        color: "#F0DF5A",
        class: "w-4/5 rounded-l-lg"
      },
      {
        tooltip: "NodeJS (Netlify Lamdba)",
        color: "#D4B73C",
        class: "w-1/5 rounded-r-lg"
      }
    ]
  },
  {
    name: "httplus",
    gh_url: "https://github.com/mdubourg001/httplus",
    description: {
      "fr-FR": <>Librairie HTTP pour C++(11)</>,
      "en-US": <>HTTP library for C++(11)</>
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      { tooltip: "C++", color: "#F24D7C", class: "w-full rounded-lg" }
    ]
  },
  {
    name: "discord_runeforge_gg",
    gh_url: "https://github.com/mdubourg001/discord_runeforge_gg",
    description: {
      "fr-FR": (
        <>
          Un bot Discord scrapant le site runeforge.gg à la recherche des runes
          de champions League of Legends
        </>
      ),
      "en-US": (
        <>
          A Discord bot scraping runeforge.gg for League of Legends champion
          runes
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      {
        tooltip: "NodeJS",
        color: "#D4B73C",
        class: "w-full rounded-lg"
      }
    ]
  },
  {
    name: "simple_clock",
    gh_url: "https://github.com/mdubourg001/simple_clock",
    description: {
      "fr-FR": <>Librairie de gestion des évènements temporels pour C++(11)</>,
      "en-US": (
        <>
          A C++(11) library aiming to provide a simple way to manage time events
        </>
      )
    }[lang !== "fr-FR" ? "en-US" : lang],
    languages: [
      { tooltip: "C++", color: "#F24D7C", class: "w-full rounded-lg" }
    ]
  }
];

export default getProjects;
