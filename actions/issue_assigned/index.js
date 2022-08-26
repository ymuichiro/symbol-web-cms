const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { api_url } = require('../const');
//
try {
  const issue = github.context.payload.issue;
  const assigneeId = issue.assignee.login;
  const issue_number = Number(issue.number);

  axios
    .post(api_url + '/api/auth/local', {
      identifier: process.env.BOT_ID,
      password: process.env.BOT_PASSWORD,
    })
    .then((resAuth) => {
      const token = resAuth.data.jwt;
      axios
        .get(api_url + '/api/users',  {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((resUser) => {
          const users = resUser.data;
          const user = users.find((d) => d.githubId === assigneeId);
          const data = {
            "data": {
              "githubId": assigneeId,
              "symbolAddress": user.symbolAddress,
            }
          }
          axios
            .get(api_url + '/api/rewards', {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
            .then((resReward) => {
              const rewards = resReward.data.data;
              const reward = rewards.find((d) => d.attributes.issueNumber === issue_number);

              axios
                .put(api_url + '/api/rewards/' + reward.id, data, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                })
                .then((resUpdateReward) => {
                  console.log('Data: ', resUpdateReward.data);
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
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
} catch (error) {
  core.setFailed(error.message);
}
