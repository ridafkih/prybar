import { withDangerousMod } from "@expo/config-plugins";
import { PodReferenceOptions } from "@/@types/pod-reference-options";
import { readFile } from "@/utils/files/file";
import { hasPodReference } from "@/utils/parsing/cocoapod";
import { shimPodfile } from "@/utils/shims/shim-podfile";
import { pod } from "@/utils/codegen/cocoapods";
import { ExpoConfig } from "@/@types/expo";
import { indent } from "@/utils/codegen/agnostic";

/**
 * Retroactively add pods with a Expo config plugin.
 * @param config The Expo configuration object.
 * @param options Reference options for the pods.
 */
export const withPods = (
  config: ExpoConfig,
  options: PodReferenceOptions[]
) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const { platformProjectRoot } = config.modRequest;
      const file = readFile(platformProjectRoot, "Podfile");

      const missingPods = options.filter(
        ({ name }) => !hasPodReference(file.content, name)
      );

      if (missingPods.length === 0) return config;

      file.write(
        shimPodfile({
          content: file.content,
          anchor: "use_frameworks",
          pods: missingPods.map((options) => indent(pod(options))),
        })
      );
      return config;
    },
  ]);
};
