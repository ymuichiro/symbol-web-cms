/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 478:
/***/ ((module) => {

const api_url = "https://symbol-web.herokuapp.com";
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

try {
    const branchName = github.context.payload.pull_request.head.ref;
    const assigneeId = github.context.payload.sender.login;

    axios
        .post(api_url + '/api/auth/local', {
            identifier: process.env.BOT_ID,
            password: process.env.BOT_PASSWORD,
        })
        .then((resAuth) => {
            const token = resAuth.data.jwt;
            axios
                .get(api_url + '/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((resRewards) => {
                    const rewards = resRewards.data.data;
                    const reward = rewards.find((d) => d.attributes.branchName === branchName);
                    if (reward.attributes.githubId !== assigneeId) throw new Error("GithubIdが違います")
                    if (reward.attributes.branchName !== branchName) throw new Error("Branch名が違います")
                    const address = reward.attributes.symbolAddress;
                    const amount = reward.attributes.rewardAmount;
                    axios
                        .get(api_url + '/api/auto-reward?address=' + address + '&amount=' + amount, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((error) => {
                            console.error(error.message);
                            throw error;
                        });
                })
                .catch((error) => {
                    console.error(error.message);
                    throw error;
                });
        })
        .catch((error) => {
            console.error(error.message);
            throw error;
        });
} catch (error) {
    core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;