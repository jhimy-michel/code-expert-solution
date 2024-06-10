import { TreeNode } from "./treeType";

/**
 * Prints a tree structure to the console.
 *
 * The function recursively traverses the tree and prints each node's name to the console,
 * with indentation to indicate the node's depth in the tree.
 * It also prints a " (r)" flag next to the name of any nodes that are not writable by the current user role.
 *
 * @param node - The root node of the tree to print.
 * @param indent - The initial indentation level (defaults to an empty string).
 */
export const printTree = (node: TreeNode, indent = "") => {
  if (!node) return;

  const readOnlyFlag = !node.isWritable ? " (r)" : "";
  console.log(`${indent}${node.name}${readOnlyFlag}`);

  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => printTree(child, indent + "\t"));
  }
};
