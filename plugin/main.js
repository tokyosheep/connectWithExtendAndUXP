/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "uxp":
/*!*********************************!*\
  !*** external "require('uxp')" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require('uxp');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uxp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uxp */ "uxp");
/* harmony import */ var uxp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uxp__WEBPACK_IMPORTED_MODULE_0__);


const fs = (uxp__WEBPACK_IMPORTED_MODULE_0___default().storage.localFileSystem);

/** 
* getting saved entry file path and directory from localStorage.
* @type {entry}
**/
const getStoragePath = async() =>{
    const f = await fs.getEntryForPersistentToken(await localStorage.getItem("watchFolder"));
    const entries = await f.getEntries();
    const jsxFolder = entries.find(entry=>{
        return entry.name === "jsxes" && entry.isFolder;
    });
    return {entries,jsxFolder};
}

/** 
* choose watch folder through dialog
* any case you can't omit it due to the security reason
**/
document.getElementById("set").addEventListener("click",async()=>{
    const f = await fs.getFolder();
    console.log(f);
    if(f===null)return;
    document.getElementById("path_name").textContent = `directory :${f.name}`;
    await localStorage.setItem("watchFolder",await fs.createPersistentToken(f));
})

/**
* excute ExtendScript through node.js
* writing in jsonData and node.js detects while watching json.
**/
document.getElementById("excute_jsx").addEventListener("click",async function(e){
    if(this.disabled){
        return;
    }
    this.disabled = true;
    const msg = document.getElementById("arg").value;
    const jsxName = document.getElementById("jsxListmenu").value;
    try{
        const {entries,jsxFolder} = await getStoragePath();
        if(jsxFolder===undefined)return;
        const msgJson = entries.find(entry=> entry.isFile && entry.name==="msg.json");
        await msgJson.write(JSON.stringify({msg,jsx:jsxName}));
    }catch(e){
        console.log(e);
    }finally{
        this.disabled = false;
    }
});



/**
* listing jsx files on selector.
* and user can select jsx from list.
**/
document.getElementById("setJsx").addEventListener("click",async()=>{
    try{
        const {jsxFolder} = await getStoragePath();
        if(jsxFolder===undefined)return;
        const jsxEntries = await jsxFolder.getEntries();
        const jsxes = jsxEntries.filter(entry=>{
            const extPlace = entry.nativePath.lastIndexOf(".");
            const ext = entry.nativePath.substr(extPlace,entry.nativePath.length);
            console.log(ext);
            return entry.isFile && ext === ".jsx";
        });
        const element = jsxes.reduce((acc,current)=>{
            return acc + `
            <sp-menu-item>${current.name}</sp-menu-item>`;
        },"");
        document.getElementById("jsxListmenu").innerHTML = element;
    }catch(e){
        console.log(e);
    }
})

document.getElementById("test").addEventListener("click",async()=>{
    const f = await fs.getFileForSaving("save.json");
    console.log(f);
    await f.write(JSON.stringify({v:"hello"}));
})
})();

/******/ })()
;
//# sourceMappingURL=main.js.map