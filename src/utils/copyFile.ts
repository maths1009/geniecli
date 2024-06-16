import fs from "fs";
import path from "path";

export const copyTemplateFiles = (templateDir: string, projectDir: string) => {
  const filesToCreate = fs.readdirSync(templateDir);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templateDir, file);

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = path.join(projectDir, file);
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(projectDir, file));

      copyTemplateFiles(
        path.join(templateDir, file),
        path.join(projectDir, file)
      );
    }
  });
};

export const copyCommonFiles = (
  commonDir: string,
  projectDir: string,
  projectName: string,
  envVars: Record<string, string>
) => {
  const filesToCreate = fs.readdirSync(commonDir);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(commonDir, file);

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      if (file === "README.md") {
        contents = contents.replace("${projectName}", projectName);
      }

      if (file === ".env" || file === ".env-sample") {
        contents = Object.keys(envVars)
          .map((key) => `${key}=${envVars[key]}`)
          .join("\n");
      }

      const writePath = path.join(projectDir, file);
      fs.writeFileSync(writePath, contents, "utf8");
    }
  });
};
