import { indent, normalize, quote, stitch } from "@/utils/codegen/agnostic";

/**
 * Creates a .gradle file classpath reference.
 * @param value The value for inside the classpath.
 */
export const classpath = (value: string) => {
  return `classpath(${quote(normalize(value))})`;
};

/**
 * Creates a .gradle file repository reference.
 * @param keyword The keyword for the reference.
 * @param url If applicable, the source for the repository.
 */
export const repository = (keyword: string, url: string) => {
  if (url) return `${keyword} { url ${quote(normalize(url), "double")} }`;
  return `${keyword}()`;
};

/**
 * Creates a plugin import statement for ,gradle file.
 * @param name The name of the plugin to import.
 */
export const pluginImport = (name: string) => {
  return `apply plugin: ${quote(normalize(name), "double")}`;
};

/**
 * Creates a .gradle plugin configuration object.
 * @param name The name of the plugin.
 * @param options An object containing key-value option pairs.
 */
export const pluginConfig = (name: string, options: Record<string, string>) => {
  const configurations = Object.entries(options).map(([key, value]) => {
    return indent(`${normalize(key)} ${quote(normalize(value))}`, 4);
  });

  return stitch(`\n${normalize(name)} {`, ...configurations, "}");
};
