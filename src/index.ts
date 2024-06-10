import jsonFile from "./data/data.json";
import { directoryTypeString, maxFolderDepth, rootDirectoryName, studentRole } from "./utils/constant";

/**
 * Main function that read a json file
 * and output in the console a Tree structure
 */

// 1. Load data
const data = jsonFile;

// 2. Filter data
const currentData = data.filter((item) => item.current && item.permissions.read.includes(studentRole));

// 3. Built tree using recursion
const rootKey = currentData.find((item) => item.name === rootDirectoryName).key;

const rootElem = currentData.find((item) => item.key === rootKey);

const buildTree = (rootKey: string, studentRole: string, data: any[], currentDept: number) => {
  const root = getItemByKey(rootKey, data);
  if (!root || !root.permissions.read.includes(studentRole)) return null;

  const tree = {
    name: root.name,
    type: root.type,
    children: [],
    isReadable: root.permissions.read.includes(studentRole),
    isWritable: root.permissions.write.includes(studentRole),
  };

  // validate if we are checking a folder and we are not in an infinite loop
  if (root.type === directoryTypeString && root.children && currentDept < maxFolderDepth) {
    tree.children = root.children
      .map((childKey: string) => buildTree(childKey, studentRole, data, currentDept + 1))
      .filter((child: null) => child !== null);
  }

  return tree;
};

// Helper function to get an item by key
const getItemByKey = (key: string, currentData: any[]) => currentData.find((item) => item.key === key);

const tree = buildTree(rootKey, studentRole, currentData, 1);

const printTreeIteratively = (node, indent = "") => {
  if (!node) return;
};

printTreeIteratively(tree, "");
