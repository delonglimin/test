/******/ (function (modules) { // webpack启动函数
/******/  // webpack会在此处缓存已经加载过的模块，以防止模块的重复加载
/******/  var installedModules = {};
/******/
/******/  // webpack自定义的模块加载函数
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // 如果模块已经被缓存则使用缓存中的模块
/******/    if (installedModules[moduleId]) {
/******/      return installedModules[moduleId].exports;
            /******/
        }
/******/    // 创建一个模块并将该模块放入缓存中，注意：这里的exports属性为空对                象，webpack会在下面的执行模块方法是将模块导出的对象挂载到module.exports
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
            /******/
        };
/******/
/******/    // 执行模块方法，并将模块导出对象挂载在module.exports
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // 标记模块已加载过
/******/    module.l = true;
/******/
/******/    // 返回模块导出对象
/******/    return module.exports;
        /******/
    }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // 这个方法很关键，我们可以在启动函数参数内部的./add.js模块中看到此方法，此方法便起到了挂载导出对象的作用
/******/  __webpack_require__.d = function (exports, name, getter) {
/******/    if (!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
        }
        /******/
    };


/******/  __webpack_require__.r = function (exports) {
/******/    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
        }
/******/    Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    };

/******/
/******/
/******/  // 加载入口模块并将导出模块返回
/******/  return __webpack_require__(__webpack_require__.s = "./index.js");
    /******/
})
/************************************************************************/
/******/({




/***/ "./add.js":
/*!****************!*\
!*** ./add.js ***!
\****************/
/*! exports provided: add */
/***/ (function (module, __webpack_exports__, __webpack_require__) {




            "use strict";
            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\nfunction add (a, b) {\n  return a + b;\n}\n\n//# sourceURL=webpack:///./add.js?");




            /***/
        }),




/***/ "./index.js":
/*!******************!*\
!*** ./index.js ***!
\******************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {




            eval("const { add } = __webpack_require__(/*! ./add */ \"./add.js\");\n\nadd(1, 1);\n\n//# sourceURL=webpack:///./index.js?");




            /***/
        })
})