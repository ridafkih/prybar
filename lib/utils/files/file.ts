import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

/**
 * Reads a file, returning an object containing the
 * function and a method that allows to write to that file.
 * @param path The path to the file.
 */
export const readFile = (...path: string[]) => {
  const fullPath = join(...path);
  const content = readFileSync(fullPath, "utf-8");

  const write = (content: string) => {
    writeFileSync(fullPath, content, "utf-8");
  };

  return { content, write };
};
