import "../node_modules/tailwindcss/dist/tailwind.min.css";
import "../node_modules/jam-icons/css/jam.min.css";
import "../node_modules/hint.css/hint.min.css";

import React from "react";
import Head from "./components/Head";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import LangProvider from "./context/LangContext";

const App = () => {
  return (
    <div id="main">
      <LangProvider>
        <Head />
        <Projects />
        <Footer />
      </LangProvider>
    </div>
  );
};

export default App;
