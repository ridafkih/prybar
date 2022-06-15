import { quote } from "@/utils/codegen/agnostic";

/**
 * Adds a comma and space before the provided value.
 * @param value The value to delimit.
 */
export const delimit = (value: string) => {
  return `, ${value}`;
};

/**
 * Turns the provided keyword and value into a Ruby
 * arrow reference.
 * @param keyword The keyword for the reference.
 * @param value The value for the reference.
 */
export const arrow = (keyword: string, value: string) => {
  return `:${keyword} => ${quote(value)}`;
};
