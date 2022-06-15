import { indent, insert, stitch } from "@/utils/codegen/agnostic";

interface ShimPodfileOptions {
  content: string;
  pods: string[];
  anchor: string;
}

export const shimPodfile = ({ content, pods, anchor }: ShimPodfileOptions) => {
  const findAnchor = (lineContent: string) => lineContent.includes(anchor);

  const lines = content.split("\n");
  const changes = pods.map(indent).join("\n");
  const anchorIndex = lines.findIndex(findAnchor);
  const anchorLine = lines[anchorIndex];

  return insert(lines, [stitch(changes, anchorLine)], anchorIndex);
};
