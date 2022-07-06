const { getInput } = require('@actions/core');
const FileSet = require('file-set');

async function run(overrides = false) {
  let glob, gist, token;

  console.log(process.env);

  if(overrides) {
    glob = overrides.glob;
    gist = overrides.gist;
    token = overrides.token;
  } else {
    glob = getInput('FILES');
    gist = getInput('GIST');
    token = getInput('TOKEN');
  }

  console.log('token', token);

  const fileSet = new FileSet();
  await fileSet.add([glob]);
  const { files } = fileSet; 
  
  console.log(`uploading ${files} to ${gist}`);
}

module.exports = {
  run
};