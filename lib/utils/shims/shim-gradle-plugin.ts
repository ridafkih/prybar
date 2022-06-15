import { insert, stitch } from "@/utils/codegen/agnostic";
import { pluginImport, pluginConfig } from "@/utils/codegen/gradle";

/**
 * Adds app plugins to a .gradle file.
 * @param content The content of the .gradle file.
 * @param name The name of the plugin to add.
 * @param options If applicable, the plugin options.
 */
export const addPlugin = (
  content: string,
  name: string,
  options?: Record<string, string>
) => {
  let lines = content.split("\n");

  const importStatement = pluginImport(name);
  const optionDeclaration = options ? pluginConfig(name, options) : undefined;

  for (const [index, line] of lines.entries()) {
    if (line.includes("apply plugin:")) continue;

    lines = insert(
      lines,
      optionDeclaration
        ? [importStatement, optionDeclaration]
        : [importStatement],
      index
    );

    break;
  }

  return stitch(lines);
};
