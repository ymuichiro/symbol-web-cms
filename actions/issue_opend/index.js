const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { api_url } = require('../const');
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
          "title": title,
          "details": comment,
          "issueNumber": issue_number,
          "issueUrl": issue_url,
          "Role": "Developer",
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