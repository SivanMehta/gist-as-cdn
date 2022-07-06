const { getInput } = require('@actions/core');
const FileSet = require('file-set');

async function run(overrides = false) {
  let glob, gist;

  if(overrides) {
    glob = overrides.glob;
    gist = overrides.gist;
  } else {
    glob = getInput('FILES');
    gist = getInput('GIST');
  }

  const fileSet = new FileSet();
  await fileSet.add([glob]);
  const { files } = fileSet; 
  
  console.log(`uploading ${files} to ${gist}`);
}

module.exports = {
  run
};