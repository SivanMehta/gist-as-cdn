import { setFailed } from '@actions/core';
import { run } from './action';

try {
  run();
} catch (e) {
  setFailed(e.message);
}