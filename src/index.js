const { setFailed } = require('@actions/core');
const { run } = require('./action');

try {
  run();
} catch (e) {
  setFailed(e.message);
}