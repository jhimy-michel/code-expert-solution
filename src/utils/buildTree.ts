import { FilesDataType } from "../data/dataType";
import { directoryTypeString, maxFolderDepth } from "./constant";
import { TreeNode } from "./treeType";

/**
 * Builds a tree structure
 * The function recursively builds the tree by first creating a `TreeNode` object for the current node.
 * It then checks if the current node is a folder and if it has children.
 * If so, it recursively builds the tree for each child node and adds it to the `children` array of the current node.
 * The function also includes a check to ensure that the maximum folder depth is not exceeded.
 * This is done by incrementing a `currentDept` variable each time a child node is processed and checking it against the `maxFolderDepth` constant.
 * @param rootKey - the key of the root file (".")
 * @param studentRole - role of the student
 * @param data - list of folder/file to process
 * @param currentDept - current depth of the tree
 * @returns
 */
export const buildTree = (
  rootKey: string,
  studentRole: string,
  data: FilesDataType[],
  currentDept: number
): TreeNode => {
  const root = getItemByKey(rootKey, data);
  if (!root || !root.permissions.read.includes(studentRole)) return null;

  const tree: TreeNode = {
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
const getItemByKey = (key: string, currentData: FilesDataType[]) => currentData.find((item) => item.key === key);
