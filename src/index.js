const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const who = core.getInput('who-to-greet');
  console.log(`Hello ${who}!`);

  const time = (new Date()).toTimeString();
  core.setOutput('time', time);

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
}

try {
  run();
} catch (e) {
  core.setFailed(e.message);
}