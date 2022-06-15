import { ExpoConfig } from "@/@types/expo";
import { GradleRepository } from "@/@types/gradle-repository";
import { readFile } from "@/utils/files/file";
import {
  hasDependency,
  hasGradlePlugin,
  hasRepository,
} from "@/utils/parsing/gradle";
import {
  shimBuildScriptDependencies,
  shimBuildScriptRepositories,
} from "@/utils/shims/shim-gradle-buildscript";
import { addPlugin } from "@/utils/shims/shim-gradle-plugin";
import { withDangerousMod } from "@expo/config-plugins";

type WithGradleOptions = {
  dependencies: string[];
  repositories: GradleRepository[];
  plugins: { name: string; options: Record<string, string> }[];
};

export const withGradle = (
  config: ExpoConfig,
  { dependencies, repositories, plugins }: WithGradleOptions
) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const { platformProjectRoot } = config.modRequest;

      const files = {
        app: readFile(platformProjectRoot, "app", "build.gradle"),
        project: readFile(platformProjectRoot, "build.gradle"),
      };

      const absentDependencies = dependencies.filter(
        (name) => !hasDependency(files.project.content, name)
      );

      const absentRepositories = repositories.filter((repository) => {
        return !hasRepository(files.project.content, repository);
      });

      const absentPlugins = plugins.filter(({ name }) => {
        return !hasGradlePlugin(files.app.content, name);
      });

      const modified = {
        project: files.project.content,
        app: files.app.content,
      };

      if (absentDependencies.length > 0)
        modified.project = files.project.write(
          shimBuildScriptDependencies(modified.project, absentDependencies)
        );

      if (absentRepositories.length > 0)
        modified.project = files.project.write(
          shimBuildScriptRepositories(modified.project, absentRepositories)
        );

      if (absentPlugins.length > 0)
        plugins.forEach((plugin) => {
          modified.app = files.app.write(
            addPlugin(modified.app, plugin.name, plugin.options)
          );
        });

      return config;
    },
  ]);
};
