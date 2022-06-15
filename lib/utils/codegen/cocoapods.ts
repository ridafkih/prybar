import { delimit, arrow } from "@/utils/codegen/ruby";
import { concat, quote, normalizeObject } from "@/utils/codegen/agnostic";
import { PodReferenceOptions } from "@/@types/pod-reference-options";

export const pod = <T extends PodReferenceOptions>(options: T) => {
  const { name, path, url, git, branch, version, tag, commit } =
    normalizeObject(options);

  const segments = ["pod ", quote(name)];
  if (version) return concat(...segments, delimit(quote(version)));

  if (path) return concat(...segments, delimit(arrow("path", path)));
  if (url) return concat(...segments, delimit(arrow("http", url)));

  if (git) segments.push(delimit(arrow("git", git)));
  if (branch) return concat(...segments, delimit(arrow("branch", branch)));
  if (tag) return concat(...segments, delimit(arrow("tag", tag)));
  if (commit) return concat(...segments, delimit(arrow("commit", commit)));

  return concat(...segments);
};
