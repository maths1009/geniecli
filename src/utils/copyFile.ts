import fs from "fs";
import path from "path";

interface CopyOptions {
  projectName?: string;
}

export const copyFiles = (
  sourceDir: string,
  destinationDir: string,
  options: CopyOptions = {}
) => {
  const filesToCreate = fs.readdirSync(sourceDir);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(sourceDir, file);
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      const writePath = path.join(destinationDir, file);
      switch (true) {
        case options.projectName && file === "README.md":
          contents = contents.replace("${projectName}", options.projectName);
          break;
        default:
          break;
      }
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(destinationDir, file), { recursive: true });
      copyFiles(
        path.join(sourceDir, file),
        path.join(destinationDir, file),
        options
      );
    }
  });
};
