module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/App */ "./src/App.js");
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/* harmony default export */ __webpack_exports__["default"] = (() => __jsx(_src_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 3
  },
  __self: undefined
}));

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Seo */ "./src/components/Seo.js");
/* harmony import */ var _components_Css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Css */ "./src/components/Css.js");
/* harmony import */ var _components_Scripts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Scripts */ "./src/components/Scripts.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Header */ "./src/components/Header.js");
/* harmony import */ var _components_Projects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Projects */ "./src/components/Projects.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Footer */ "./src/components/Footer.js");
/* harmony import */ var _context_LangContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./context/LangContext */ "./src/context/LangContext.js");
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/App.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










const App = () => {
  return __jsx("div", {
    id: "main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, __jsx(_components_Seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }), __jsx(_components_Css__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }), __jsx(_components_Scripts__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }), __jsx(_context_LangContext__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }), __jsx(_components_Projects__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }), __jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/Css.js":
/*!*******************************!*\
  !*** ./src/components/Css.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Css.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


/* harmony default export */ __webpack_exports__["default"] = (() => __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
}, __jsx("link", {
  href: "https://cdn.jsdelivr.net/npm/tailwindcss@0.7.4/dist/tailwind.min.css",
  rel: "stylesheet",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: undefined
}), __jsx("link", {
  href: "https://unpkg.com/jam-icons/css/jam.min.css",
  rel: "stylesheet",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: undefined
}), __jsx("link", {
  href: "https://unpkg.com/hint-css.js@1.1.0/src/hint-css.css",
  rel: "stylesheet",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: undefined
}), __jsx("link", {
  href: "https://fonts.googleapis.com/css?family=Montserrat:400,700",
  rel: "stylesheet",
  lazyload: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 16
  },
  __self: undefined
}), __jsx("link", {
  href: "https://fonts.googleapis.com/css?family=Satisfy",
  rel: "stylesheet",
  lazyload: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 21
  },
  __self: undefined
}), __jsx("link", {
  href: "/style.css",
  rel: "stylesheet",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 27
  },
  __self: undefined
})));

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_LangContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/LangContext */ "./src/context/LangContext.js");
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Footer.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Footer = () => {
  const {
    lang,
    setLang
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_LangContext__WEBPACK_IMPORTED_MODULE_1__["LangContext"]);
  return __jsx("div", {
    className: "w-full text-center mt-20 mb-12",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, lang === "fr-FR" && __jsx("p", {
    className: "text-grey-darker",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, "Besoin de me contacter? E-mailez moi!"), lang !== "fr-FR" && __jsx("p", {
    className: "text-grey-darker",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, "Want to get in touch? Throw me an email at"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }), __jsx("b", {
    className: "text-grey-darkest",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, "maxime.dubourg@protonmail.com"));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_LangContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/LangContext */ "./src/context/LangContext.js");
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Header.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Header = props => {
  const {
    lang,
    setLang
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_LangContext__WEBPACK_IMPORTED_MODULE_1__["LangContext"]);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "flex justify-center items-center floating-light-animation",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, __jsx("img", {
    className: "h-24 mr-4",
    src: "/me.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }), __jsx("h1", {
    className: "font-cursive text-shadow text-2xl",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, "Maxime Dubourg")), __jsx("div", {
    className: "flex items-center justify-center mt-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, __jsx("div", {
    className: "mr-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, __jsx("a", {
    className: "flex items-center justify-center text-grey-darkest text-xs no-underline ml-2",
    target: "_blank",
    href: "https://github.com/mdubourg001?tab=repositories",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: undefined
  }, __jsx("span", {
    className: "jam text-xl jam-github-circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }), __jsx("span", {
    className: "hidden sm:block ml-2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  }, "/mdubourg001"))), __jsx("div", {
    className: "ml-4 mr-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }, __jsx("a", {
    className: "flex items-center justify-center text-grey-darkest text-xs no-underline ml-1",
    target: "_blank",
    href: "https://twitter.com/_damnhotuser",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }, __jsx("span", {
    className: "jam text-xl jam-twitter-circle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: undefined
  }), __jsx("span", {
    className: "hidden sm:block ml-1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: undefined
  }, "@_damnhotuser"))), __jsx("div", {
    className: "flex items-center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }, __jsx("small", {
    className: "mr-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, "|"), __jsx("small", {
    className: `mr-1 ${lang !== "fr-FR" && "opacity-50"} cursor-pointer hover:opacity-100`,
    onClick: () => setLang("fr-FR"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, "\uD83C\uDDEB\uD83C\uDDF7"), __jsx("small", {
    className: `ml-1 ${lang === "fr-FR" && "opacity-50"} cursor-pointer hover:opacity-100`,
    onClick: () => setLang("en-US"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, "\uD83C\uDDFA\uD83C\uDDF8"))), __jsx("h2", {
    className: "w-full text-center leading-normal font-normal mt-20 ",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }, lang === "fr-FR" && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "D\xE9veloppeur web", " ", __jsx("span", {
    className: "font-bold cursor-default hint--top hint--rounded",
    "aria-label": "\u269B\uFE0F Javascript",
    style: {
      color: "#F0DF5A"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  }, "\xA0full"), "-", __jsx("span", {
    className: "font-bold cursor-default hint--top hint--rounded",
    "aria-label": "\uD83D\uDC0D Django",
    style: {
      color: "#3972A4"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: undefined
  }, "stack"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }), "\xE0", " ", __jsx("span", {
    className: "font-cursive font-bold",
    style: {
      color: "#652238"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, "\xA0Bordeaux"), "."), lang !== "fr-FR" && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, " ", __jsx("span", {
    className: "font-bold cursor-default hint--top hint--rounded",
    "aria-label": "\u269B\uFE0F Javascript",
    style: {
      color: "#F0DF5A"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: undefined
  }, "Full"), "-", __jsx("span", {
    className: "font-bold cursor-default hint--top hint--rounded",
    "aria-label": "\uD83D\uDC0D Django",
    style: {
      color: "#3972A4"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: undefined
  }, "stack\xA0"), "web developer", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: undefined
  }), "from", " ", __jsx("span", {
    className: "font-cursive font-bold",
    style: {
      color: "#652238"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    },
    __self: undefined
  }, "\xA0Bordeaux"), ".")));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/components/Projects.js":
/*!************************************!*\
  !*** ./src/components/Projects.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_LangContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/LangContext */ "./src/context/LangContext.js");
/* harmony import */ var _utils_projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/projects */ "./src/utils/projects.js");
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Projects.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Projects = () => {
  const {
    lang,
    setLang
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_LangContext__WEBPACK_IMPORTED_MODULE_1__["LangContext"]);
  const projects = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_utils_projects__WEBPACK_IMPORTED_MODULE_2__["default"])(lang), [lang]);
  return __jsx("div", {
    className: "mt-20",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, projects.map(project => __jsx("div", {
    className: "mb-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, __jsx("div", {
    className: "flex justify-between items-center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }, __jsx("a", {
    className: "text-grey-darkest font-bold no-underline border-b border-grey-darker hover:text-dark mb-1",
    target: "_blank",
    href: project.gh_url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, project.name), __jsx("div", {
    className: "flex w-24 rounded ml-4 pb-1",
    style: {
      height: "9px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, project.languages.map(l => __jsx("div", {
    className: `hint--top hint--rounded h-full ${l.class}`,
    "aria-label": l.tooltip,
    style: {
      backgroundColor: l.color
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  })))), __jsx("small", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  }, project.description))), __jsx("div", {
    className: "flex justify-center mt-20",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, __jsx("a", {
    className: "flex items-center bg-white no-underline hover:shadow text-black rounded-full px-4 py-2",
    target: "_blank",
    href: "https://github.com/mdubourg001?tab=repositories",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: undefined
  }, lang === "fr-FR" && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("span", {
    className: "jam text-xl jam-github-circle mr-2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }), __jsx("small", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: undefined
  }, "Voir plus sur GitHub")), lang !== "fr-FR" && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("span", {
    className: "jam text-xl jam-github-circle mr-2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }), __jsx("small", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }, "See more on GitHub")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Projects);

/***/ }),

/***/ "./src/components/Scripts.js":
/*!***********************************!*\
  !*** ./src/components/Scripts.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Scripts.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


/* harmony default export */ __webpack_exports__["default"] = (() => __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
}, __jsx("script", {
  src: "//instant.page/1.2.2",
  type: "module",
  integrity: "sha384-2xV8M5griQmzyiY3CDqh1dn4z3llDVqZDqzjzcY+jCBCk/a5fXJmuZ/40JJAPeoU",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: undefined
})));

/***/ }),

/***/ "./src/components/Seo.js":
/*!*******************************!*\
  !*** ./src/components/Seo.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/components/Seo.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


/* harmony default export */ __webpack_exports__["default"] = (() => __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
}, __jsx("meta", {
  charset: "utf-8",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: undefined
}), __jsx("link", {
  rel: "shortcut icon",
  href: "%PUBLIC_URL%/favicon.ico",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: undefined
}), __jsx("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1, shrink-to-fit=no",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: undefined
}), __jsx("meta", {
  name: "description",
  content: "Full-stack web developer from Bordeaux.",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12
  },
  __self: undefined
}), __jsx("meta", {
  name: "theme-color",
  content: "#000000",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 16
  },
  __self: undefined
}), __jsx("link", {
  rel: "manifest",
  href: "%PUBLIC_URL%/manifest.json",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 18
  },
  __self: undefined
}), __jsx("title", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 19
  },
  __self: undefined
}, "Maxime Dubourg")));

/***/ }),

/***/ "./src/context/LangContext.js":
/*!************************************!*\
  !*** ./src/context/LangContext.js ***!
  \************************************/
/*! exports provided: LangContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LangContext", function() { return LangContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/context/LangContext.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const defaultLang = "fr-FR";
const LangContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(defaultLang);

const LangProvider = ({
  children
}) => {
  const {
    0: lang,
    1: setLang
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultLang);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.localStorage.setItem("lang", lang);
  }, [lang]);
  return __jsx(LangContext.Provider, {
    value: {
      lang,
      setLang
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (LangProvider);

/***/ }),

/***/ "./src/utils/projects.js":
/*!*******************************!*\
  !*** ./src/utils/projects.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/maxime.dubourg/Documents/work/others/maximedubourg.com/src/utils/projects.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const getProjects = lang => [{
  name: "chaussette",
  gh_url: "https://github.com/mdubourg001/chaussette",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Un proxy NodeJS permettant de communiquer avec un serveur TCP depuis une WebSocket. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.npmjs.com/package/chaussette",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#CA3837"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: undefined
    }, "npm")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A nodejs proxy to communicate with TCP servers from a browser's WebSocket.. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.npmjs.com/package/chaussette",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#CA3837"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: undefined
    }, "npm"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "NodeJS",
    color: "#D4B73C",
    class: "w-full rounded-lg"
  }]
}, {
  name: "react-infinite-list",
  gh_url: "https://github.com/mdubourg001/react-infinite-list",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Composant React permettant le rendu de listes dont les donn\xE9es sont fetch\xE9es lors du scrolling. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.npmjs.com/package/@damnhotuser/react-infinite-list",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#CA3837"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: undefined
    }, "npm")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "React component allowing render of on-scroll fetched data lists. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.npmjs.com/package/@damnhotuser/react-infinite-list",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#CA3837"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: undefined
    }, "npm"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Javascript (ReactJS)",
    color: "#F0DF5A",
    class: "w-full rounded-lg "
  }]
}, {
  name: "(k)lean-canvas.com",
  gh_url: "https://github.com/mdubourg001/klean-canvas",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Outil en ligne de cr\xE9ation de Lean Canvas. Permet un export (et import) au format JSON pour sauvegarde locale, ainsi qu'un export PNG pour partage ou pr\xE9sentation. De plus, votre travail est automatiquement sauvegard\xE9 dans le localStorage. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://klean-canvas.com",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#FC8181"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95
      },
      __self: undefined
    }, "klean-canvas.com")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Online Lean Canvas creation tool. Allows JSON import/export for local saving, and PNG export for sharing. Moreover, your work is automatically saved in localStorage. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://klean-canvas.com",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#FC8181"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: undefined
    }, "klean-canvas.com"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Javascript (ReactJS)",
    color: "#F0DF5A",
    class: "w-full rounded-lg "
  }]
}, {
  name: "3d-piano",
  gh_url: "https://github.com/mdubourg001/3d-piano",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Un piano 3D, dans votre navigateur (three.js). \uD83D\uDC40", " ", __jsx("a", {
      href: "https://3d-piano.netlify.com",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#9066CC"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136
      },
      __self: undefined
    }, "3d-piano.netlify.com")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A 3D piano built using three.js. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://3d-piano.netlify.com",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#9066CC"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149
      },
      __self: undefined
    }, "3d-piano.netlify.com"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Javascript (three.js)",
    color: "#F0DF5A",
    class: "w-full rounded-lg"
  }]
}, {
  name: "regexplosion.io",
  gh_url: "https://github.com/mdubourg001/regexplosion",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("span", {
      className: "text-grey-darker",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174
      },
      __self: undefined
    }, "(\u26A0\uFE0F Non prouv\xE9 et non complet, \xE0 utiliser \xE0 vos risques & p\xE9rils)"), __jsx("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 177
      },
      __self: undefined
    }), "G\xE9n\xE9rateur d'expressions r\xE9guli\xE8res. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://regexplosion.io",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#165EA3"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 179
      },
      __self: undefined
    }, "regexplosion.io")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("span", {
      className: "text-grey-darker",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191
      },
      __self: undefined
    }, "(\u26A0\uFE0F Not proved & not fully working, so use it at your own risks !)"), __jsx("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194
      },
      __self: undefined
    }), "Regular expression visual generator. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://regexplosion.io",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#165EA3"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 196
      },
      __self: undefined
    }, "regexplosion.io"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Javascript (VueJS)",
    color: "#F0DF5A",
    class: "w-full rounded-lg "
  }]
}, {
  name: "leboncoin_spider",
  gh_url: "https://github.com/mdubourg001/leboncoin_spider",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Script configurable scrappant les offres du site Leboncoin.fr en vous envoyant des mails quand des offres r\xE9pondant \xE0 vos crit\xE8res apparaissent"),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Configurable script scrapping Leboncoin.fr and sending you e-mails when new offers matching your criterias appear")
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Python",
    color: "#3972A4",
    class: "w-full rounded-lg "
  }]
}, {
  name: __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "cecech ", __jsx("small", {
    className: "text-grey-darker",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240
    },
    __self: undefined
  }, "(wip.)")),
  gh_url: "https://github.com/mdubourg001/cecech",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Jeu (runner-like) d\xE9velopp\xE9 \xE0 l'occasion de la sortie de l'EP du musicien Bordelais, Cecech. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.deezer.com/fr/artist/1203886",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#D4B73C"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: undefined
    }, "deezer")),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Video game (runner-like) specially developed for the release of the EP of the musician from Bordeaux, Cecech. \uD83D\uDC40", " ", __jsx("a", {
      href: "https://www.deezer.com/fr/artist/1203886",
      target: "_blank",
      className: "underline font-bold",
      style: {
        color: "#D4B73C"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 263
      },
      __self: undefined
    }, "deezer"))
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "Javascript (PixiJS)",
    color: "#F0DF5A",
    class: "w-4/5 rounded-l-lg"
  }, {
    tooltip: "NodeJS (Netlify Lamdba)",
    color: "#D4B73C",
    class: "w-1/5 rounded-r-lg"
  }]
}, {
  name: "httplus",
  gh_url: "https://github.com/mdubourg001/httplus",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Librairie HTTP pour C++(11)"),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "HTTP library for C++(11)")
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "C++",
    color: "#F24D7C",
    class: "w-full rounded-lg"
  }]
}, {
  name: "discord_runeforge_gg",
  gh_url: "https://github.com/mdubourg001/discord_runeforge_gg",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Un bot Discord scrapant le site runeforge.gg \xE0 la recherche des runes de champions League of Legends"),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A Discord bot scraping runeforge.gg for League of Legends champion runes")
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "NodeJS",
    color: "#D4B73C",
    class: "w-full rounded-lg"
  }]
}, {
  name: "simple_clock",
  gh_url: "https://github.com/mdubourg001/simple_clock",
  description: {
    "fr-FR": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Librairie de gestion des \xE9v\xE8nements temporels pour C++(11)"),
    "en-US": __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A C++(11) library aiming to provide a simple way to manage time events")
  }[lang !== "fr-FR" ? "en-US" : lang],
  languages: [{
    tooltip: "C++",
    color: "#F24D7C",
    class: "w-full rounded-lg"
  }]
}];

/* harmony default export */ __webpack_exports__["default"] = (getProjects);

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maxime.dubourg/Documents/work/others/maximedubourg.com/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map