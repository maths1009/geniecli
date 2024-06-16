import { fileURLToPath } from "url";
import { dirname } from "path";

export const getCurrentDir = (metaUrl: string) => {
  return dirname(fileURLToPath(metaUrl));
};
