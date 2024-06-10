/**
 * Interface for a tree node object.
 * A tree node object represents a node in a hierarchical tree structure,
 * such as a file system or a directory tree.
 */

export interface TreeNode {
  name: string;
  type: string;
  children: TreeNode[];
  isReadable: boolean;
  isWritable: boolean;
}
