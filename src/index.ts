import rawData from "./data/data.json";
import { FilesDataType } from "./data/dataType";
import { buildTree } from "./utils/buildTree";
import { rootDirectoryName, studentRole } from "./utils/constant";
import { printTree } from "./utils/printTree";
import { TreeNode } from "./utils/treeType";

/**
 * Solution for the code-expert task.
 * 
 * 1. Load the data from a JSON file.
 * 2. Filter the data to include only the current (current === true) and files that can be read by the role (e.g.: "student" role).
 * 3. Build the tree structure using a recursive function.
 * 4. Print the tree structure to the console.
 */

const data = rawData as FilesDataType[];

const currentData: FilesDataType[] = data.filter((item) => item.current && item.permissions.read.includes(studentRole));

const rootKey: string = currentData.find((item) => item.name === rootDirectoryName).key;
const tree: TreeNode = buildTree(rootKey, studentRole, currentData, 1);

printTree(tree, "");