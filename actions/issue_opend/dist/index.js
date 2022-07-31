/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 478:
/***/ ((module) => {

const api_url = "http://localhost:1337";
module.exports = {api_url};

/***/ }),

/***/ 325:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 994:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 296:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(325);
const github = __nccwpck_require__(994);
const axios = __nccwpck_require__(296);
const { api_url } = __nccwpck_require__(478);
function getValue(data, ward) {
  const lines = data.split("\n");
  function filterWards(arr, query) {
    return arr.filter(function (el) {
      return el.indexOf(query) !== -1;
    });
  }
  const filterd = filterWards(lines, ward);
  return filterd[0].replace(ward, "");
}

try {
  const issue = github.context.payload.issue;
  const title = issue.title;
  if (!title.match(/future/)) {
    throw new Error("title に future が含まれていないため終了します");
  }

  const issue_number = issue.number;
  const issue_url = issue.html_url;
  const comment = issue.body;
  axios
    .post(api_url + '/api/auth/local', {
      identifier: process.env.BOT_ID,
      password: process.env.BOT_PASSWORD,
    })
    .then((resAuth) => {
      const token = resAuth.data.jwt;
      const reward_amount = getValue(comment, "$reward=")

      const data = {
        "data": {
          "branchName": title,
          "issueNumber": issue_number,
          "issueUrl": issue_url,
          "rewardType": 0,
          "rewardAmount": reward_amount,
        }
      }

      axios
        .post(api_url + '/api/rewards', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((resReward) => {
          console.log('Data: ', resReward.data);
        })
        .catch((error) => {
          core.setFailed(error.message);
        });
    })
    .catch((error) => {
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;