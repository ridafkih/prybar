import { getConfigKeywordData } from "@/utils/parsing/gradle";
import { insert, indent, stitch } from "@/utils/codegen/agnostic";
import { classpath, repository } from "@/utils/codegen/gradle";
import { GradleRepository } from "@/@types/gradle-repository";

/**
 * Adds dependencies to the buildscript section of the
 * provided .gradle file.
 * @param content The .gradle file contents.
 * @param classpaths The classpaths to add.
 */
export const shimBuildScriptDependencies = (
  content: string,
  classpaths: string[]
) => {
  const lines = content.split("\n");
  const { indents, index } = getConfigKeywordData(lines, "dependencies");

  return insert(
    lines,
    classpaths.map((path) => indent(classpath(path), indents)),
    index + 1
  ).join("\n");
};

/**
 * Adds repositories to the provided .gradle file
 * contents.
 * @param content The content to shim.
 * @param repositories An array of repository options to add.
 */
export const shimBuildScriptRepositories = (
  content: string,
  repositories: GradleRepository[]
) => {
  const lines = content.split("\n");
  const { index, indents } = getConfigKeywordData(lines, "repositories");

  return stitch(
    insert(
      lines,
      repositories.map(({ name, url }) =>
        indent(repository(name, url), indents)
      ),
      index + 1
    )
  );
};
