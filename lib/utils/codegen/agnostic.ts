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
export const normalizeString = (value: string) => {
  return value.replace(/[^A-z0-9\.:%-_.~/g, ""]/g, "");
};

/**
 * Applies the `normalizeString` function, which
 * removes unecessary characters from a string to
 * all the values in a key-value pair.
 * @param record The object of which values to clean.
 */
export const normalizeObject = <T extends Record<string, string>>(
  record: T
) => {
  return Object.entries(record).reduce((accumulator: T, [key, value]) => {
    return {
      ...accumulator,
      [key]: normalizeString(value),
    };
  }, <T>{});
};
