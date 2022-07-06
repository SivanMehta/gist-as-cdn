const { getInput } = require('@actions/core');
const github = require('@actions/github');
const FileSet = require('file-set');

async function generateFiles(glob) {
  const fileSet = new FileSet();
  await fileSet.add([glob]);
  return fileSet.files;
}

function generateInput(overrides) {
  let glob, gist, token;
  if(overrides) {
    glob = overrides.glob;
    gist = overrides.gist;
    token = overrides.token;
  } else {
    glob = getInput('FILES');
    gist = getInput('GIST');
    token = getInput('TOKEN');
  }

  return {
    glob, gist, token
  };
}

async function uploadFiles(files, gist, token) {
  const octokit = github.getOctokit(token);

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: 'SivanMehta',
    repo: 'gist-as-cdn',
    pull_number: 1,
    mediaType: {
      format: 'diff'
    }
  });

  console.log(pullRequest);
}

async function run(overrides = false) {
  const { glob, gist, token } = generateInput(overrides);
  const files = await generateFiles(glob);
  await uploadFiles(files, gist, token);
}

module.exports = {
  run
};