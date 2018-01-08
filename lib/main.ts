import * as fss from 'fs-syncx';
import * as nodepath from 'path';

function mainInternal(directory: string, ignoreMap: { [key: string]: boolean }): object|null {
  const res: { [key: string]: string|object } = {};

  const files = fss.listFiles(directory, true).filter((file) => !ignoreMap[file.name]);
  if (files) {
    for (const fileInfo of files) {
      res[fileInfo.name] = fss.readTextFile(fileInfo.fullPath, true) as string;
    }
  }

  const dirs = fss.listDirs(directory, true);
  if (dirs) {
    for (const fileInfo of dirs) {
      const dirRes = mainInternal(fileInfo.fullPath, ignoreMap);
      if (dirRes) {
        res[fileInfo.name] = dirRes;
      }
    }
  }

  if (Object.keys(res).length) {
    return res;
  }
  return null;
}

export default function objectFromDirectory(directory: string, ignoredFiles: string[]|null = null): object|null {
  const path = nodepath.resolve(directory);
  if (!fss.dirExists(path)) {
    throw new Error(`The directory "${path}" does not exist`);
  }
  const ignoreMap: { [key: string]: boolean } = {};
  if (ignoredFiles && ignoredFiles.length) {
    for (const file of ignoredFiles) {
      ignoreMap[file] = true;
    }
  }

  return mainInternal(path, ignoreMap);
}
