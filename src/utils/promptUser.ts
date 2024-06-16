import inquirer from "inquirer";

export const promptUser = async (): Promise<{
  projectName: string;
  projectType: ProjectType;
}> => {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Nom du projet:",
      default: "my-project",
    },
  ]);

  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "Quel type de projet voulez-vous créer?",
      choices: ["react", "vue", "express"],
    },
  ]);

  return { projectName, projectType: projectType as ProjectType };
};
