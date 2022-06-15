import { quote } from "@/utils/codegen/agnostic";

/**
 * Returns whether the Podfile contents has a
 * reference to the Cocoapod.
 * @param contents The contents of the Podfile.
 * @param name The Cocoapod to check for.
 */
export const hasPodReference = (contents: string, name: string) => {
  return contents.includes(`pod ${quote(name)}`);
};
