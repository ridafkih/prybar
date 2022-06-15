export const getConfigKeywordData = (lines: string[], keyword: string) => {
  const index = lines.findIndex((line) => line.endsWith(`${keyword} {`));

  if (index === -1)
    throw Error("Attempted to locate keyword that does not exist.");

  const indents = lines[index].search(/\S/g) + 4;

  return { index, indents };
};
