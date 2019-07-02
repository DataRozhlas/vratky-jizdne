/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/byeie.js":
/*!*********************!*\
  !*** ./js/byeie.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function byeIE() {\n  if (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {\n    var warn = document.createElement('div');\n    warn.innerHTML = 'Používáte zastaralý Internet Explorer, takže vám části tohoto webu nemusí fungovat. Navíc to <a target=\"_blank\" style=\"color:white;\" rel=\"noopener noreferrer\" href=\"https://www.zive.cz/clanky/microsoft-internet-explorer-neni-prohlizec-prestante-ho-tak-pouzivat/sc-3-a-197149/default.aspx\">není bezpečné</a>, zvažte přechod na <a target=\"_blank\" style=\"color:white;\" rel=\"noopener noreferrer\" href=\"https://www.mozilla.org/cs/firefox/new/\">jiný prohlížeč</a>.';\n    warn.style.cssText = 'text-align:center;position:absolute;width:100%;height:auto;opacity:1;z-index:100;background-color:#d52834;top:37px;padding-top:4px;padding-bottom:3px;color:white;';\n    document.body.appendChild(warn);\n  }\n}\n\nbyeIE();\n\n//# sourceURL=webpack:///./js/byeie.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _byeie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./byeie */ \"./js/byeie.js\");\n/* harmony import */ var _byeie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_byeie__WEBPACK_IMPORTED_MODULE_0__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n // loučíme se s IE\n\nvar rendruj = function rendruj(data) {\n  var unikatniIC = _toConsumableArray(new Set(data.map(function (x) {\n    return x.ic;\n  }))); // unikatniIC.forEach((ic) => {\n  //   console.log(data.filter(zaznam => ic === zaznam.ic));\n  // });\n  // const dataArray = \n\n\n  console.log(data); // eslint-disable-next-line no-undef\n\n  Highcharts.setOptions({\n    lang: {\n      months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],\n      shortMonths: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],\n      decimalPoint: ',',\n      numericSymbols: [' tis.', ' mil.', 'mld.', 'T', 'P', 'E'],\n      rangeSelectorFrom: 'od',\n      rangeSelectorTo: 'do',\n      rangeSelectorZoom: 'období'\n    }\n  }); // eslint-disable-next-line no-undef\n\n  Highcharts.stockChart('graf', {\n    chart: {\n      alignTicks: false\n    },\n    xAxis: {\n      events: {\n        afterSetExtremes: function afterSetExtremes(e) {\n          var minFirstDay = new Date(e.min);\n          console.log(minFirstDay);\n        }\n      }\n    },\n    rangeSelector: {\n      buttons: [{\n        type: 'ytd',\n        text: 'letos'\n      }, {\n        type: 'year',\n        count: 1,\n        text: 'rok'\n      }, {\n        type: 'all',\n        text: 'vše'\n      }],\n      selected: 1\n    },\n    title: {\n      text: 'Kompenzace slev z jízdného ve veřejné osobní dopravě proplacené ministerstvem dopravy'\n    },\n    subtitle: {\n      text: 'Faktury jsou v grafu zařazené podle data vystavení, fakturované kompenzace se mohou vztahovat k jinému období'\n    },\n    credits: {\n      text: 'Zdroj: Uhrazené faktury – otevřená data ministerstva dopravy',\n      href: 'https://www.mdcr.cz/Ministerstvo/Otevrena-data/Faktury?returl=/Ministerstvo/Otevrena-data'\n    },\n    series: [{\n      color: '#d52834',\n      turboThreshold: 4000,\n      type: 'column',\n      name: 'proplacené kompenzace',\n      data: data,\n      dataGrouping: {\n        units: [['month', [1]]]\n      }\n    }],\n    tooltip: {\n      valueDecimals: 0,\n      valueSuffix: ' Kč'\n    },\n    navigator: {\n      series: {\n        type: 'column',\n        dataGrouping: {\n          units: [['month', [1]]]\n        }\n      }\n    }\n  });\n};\n\nfetch('js/data/data.json').then(function (response) {\n  if (!response.ok) {\n    throw new Error('Error getting the data');\n  }\n\n  return response;\n}).then(function (result) {\n  return result.json();\n}).then(function (data) {\n  rendruj(data);\n})[\"catch\"](function (err) {\n  return console.log(err);\n});\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })

/******/ });