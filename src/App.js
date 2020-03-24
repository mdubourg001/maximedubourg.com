import React from "react";
import Head from "next/head";
import Seo from "./components/Seo";
import Css from "./components/Css";
import Scripts from "./components/Scripts";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import LangProvider from "./context/LangContext";

const App = () => {
  return (
    <div id="main">
      <Seo />
      <Css />
      <Scripts />

      <LangProvider>
        <Header />
        <Projects />
        <Footer />
      </LangProvider>
    </div>
  );
};

export default App;
