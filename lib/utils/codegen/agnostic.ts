type QuoteType = "single" | "double";
type QuoteCharacter = '"' | "'";

/**
 * Surrounds the value in quotes.
 * @param value The value to surround.
 * @param type The type of quote to use.
 */
export const quote = (value: string, type: QuoteType = "single") => {
  const quoteMap: Record<QuoteType, QuoteCharacter> = {
    double: '"',
    single: "'",
  };

  const character = quoteMap[type];
  return `${character}${value}${character}`;
};

/**
 * Indents a value using spaces.
 * @param value The value to indent.
 * @param count The number of spaces.
 */
export const indent = (value: string, count: number = 2) => {
  return `${" ".repeat(count)}${value}`;
};

/**
 * Removes unecessary characters from a string.
 * @param value The string to clean.
 */
export const normalize = (value: string) => {
  return value.replace(/[^A-z0-9\.:%-_.~/g, ""]/g, "");
};

/**
 * Applies the `normalize` function, which
 * removes unecessary characters from a string to
 * all the values in a key-value pair.
 * @param record The object of which values to clean.
 */
export const normalizeObject = <T extends Record<string, string | undefined>>(
  record: T
) => {
  return Object.entries(record).reduce((accumulator: T, [key, value]) => {
    if (!value) return accumulator;
    return {
      ...accumulator,
      [key]: normalize(value),
    };
  }, <T>{});
};

export const concat = (...values: string[]) => {
  return values.join("");
};

/**
 * Stitches an array of lines into a single string.
 * @param lines The lines to stitch.
 */
export const stitch = (...lines: string[] | [string[]]) => {
  if (lines.length === 1 && Array.isArray(lines[0])) return lines[0].join("\n");
  return lines.join("\n");
};

/**
 * Inserts lines into a set of lines at a certain position.
 * @param original The lines to insert into.
 * @param lines  The lines to add.
 * @param position The position to add the new lines.
 * @returns An array containing all lines after the insert.
 */
export const insert = (
  original: string[],
  lines: string[],
  position: number
) => {
  return [
    ...original.slice(0, position),
    ...lines,
    ...original.slice(position, original.length),
  ];
};
