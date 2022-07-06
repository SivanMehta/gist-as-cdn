import { getInput } from '@actions/core';
import FileSet from 'file-set';

export async function run() {
  const glob = getInput('FILES');
  const fileSet = new FileSet();
  await fileSet.add([glob]);
  const { files } = fileSet; 
  
  const gist = getInput('GIST');
  console.log(`uploading ${files} to ${gist}`);
}