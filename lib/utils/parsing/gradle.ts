import { GradleRepository } from "@/@types/gradle-repository";

export const getConfigKeywordData = (lines: string[], keyword: string) => {
  const index = lines.findIndex((line) => line.endsWith(`${keyword} {`));

  if (index === -1)
    throw Error("Attempted to locate keyword that does not exist.");

  const indents = lines[index].search(/\S/g) + 4;

  return { index, indents };
};

export const hasDependency = (content: string, name: string) => {
  return content.includes(name.split(":")[0]);
};

export const hasRepository = (
  content: string,
  repository: GradleRepository
) => {
  return content.includes(repository.url);
};

export const hasGradlePlugin = (content: string, name: string) => {
  return content.includes(`plugin: "${name}"`);
};
