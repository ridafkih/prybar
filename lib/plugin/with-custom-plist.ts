import { ExpoConfig } from "@/@types/expo";
import { withInfoPlist } from "@expo/config-plugins";

type PlistAlteration = {
  key: string;
  value: string | number | boolean | Record<string, string>;
};

/**
 * Modify values in the Info.plist on iOS.
 * @param config The Expo configuration.
 * @param alterations A list of alterations to make.
 */
export const withCustomPlist = (
  config: ExpoConfig,
  alterations: PlistAlteration[]
) => {
  return withInfoPlist(config, (config) => {
    alterations.forEach(({ key, value }) => {
      const original = config.modResults[key];
      config.modResults[key] =
        typeof original === "object" && typeof value === "object"
          ? {
              ...original,
              ...value,
            }
          : value;
    });

    return config;
  });
};
