import { Command } from "commander";
import path from "path";
import fs from "fs";
import { promptUser } from "./utils/promptUser";
import { copyFiles } from "./utils/copyFile";
import { getCurrentDir } from "./utils/getCurrentDir";
import packageJSON from "../package.json";
import { envVars } from "./constants";

const currentDir = getCurrentDir(import.meta.url);

const program = new Command();

program
  .version(packageJSON.version)
  .description("CLI pour créer des projets React, Vue ou Express API")
  .action(async () => {
    const { projectName, projectType } = await promptUser();

    const templateDir = path.join(currentDir, `../templates/${projectType}`);
    const commonDir = path.join(currentDir, "../templates/common");
    const projectDir = path.join(process.cwd(), projectName);

    if (!fs.existsSync(templateDir)) {
      console.error(
        `Le type de projet "${projectType}" n'existe pas dans le répertoire templates.`
      );
      process.exit(1);
    }

    if (fs.existsSync(projectDir)) {
      console.error(`Le répertoire ${projectDir} existe déjà.`);
      process.exit(1);
    }

    fs.mkdirSync(projectDir);
    copyFiles(templateDir, projectDir);
    copyFiles(commonDir, projectDir, {
      projectName,
      envVars: envVars[projectType],
    });
    console.log(`Projet ${projectType} créé avec succès dans ${projectDir}`);
  });

program.parse(process.argv);
