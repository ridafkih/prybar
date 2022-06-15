import { indent, insert, stitch } from "@/utils/codegen/agnostic";

interface ShimPodfileOptions {
  content: string;
  pods: string[];
  anchor: string;
}

/**
 * Shims the Podfile with the provided lines before the provided anchor text.
 * @param props.content The content of the Podfile.
 * @param props.pods An array of pod string to add.
 * @param props.anchor Content of a line to add the pod references before.
 */
export const shimPodfile = ({ content, pods, anchor }: ShimPodfileOptions) => {
  const findAnchor = (lineContent: string) => lineContent.includes(anchor);

  const lines = content.split("\n");
  const changes = pods.map(indent).join("\n");
  const anchorIndex = lines.findIndex(findAnchor);
  const anchorLine = lines[anchorIndex];

  return insert(lines, [stitch(changes, anchorLine)], anchorIndex);
};
