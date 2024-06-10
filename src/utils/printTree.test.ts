import { printTree } from "./printTree";
import { TreeNode } from "./treeType";

describe("printTree function", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("should correctly print the tree structure", () => {
    const tree: TreeNode = {
      name: ".",
      type: "inode/directory",
      children: [
        {
          name: "dir1",
          type: "inode/directory",
          children: [
            {
              name: "file2.txt",
              type: "text/plain",
              children: [],
              isReadable: true,
              isWritable: false,
            },
          ],
          isReadable: true,
          isWritable: false,
        },
        {
          name: "file1.txt",
          type: "text/plain",
          children: [],
          isReadable: true,
          isWritable: false,
        },
      ],
      isReadable: true,
      isWritable: false,
    };

    printTree(tree);

    expect(consoleSpy).toHaveBeenCalledWith(". (r)");
    expect(consoleSpy).toHaveBeenCalledWith("\tdir1 (r)");
    expect(consoleSpy).toHaveBeenCalledWith("\t\tfile2.txt (r)");
    expect(consoleSpy).toHaveBeenCalledWith("\tfile1.txt (r)");
  });

  test("should handle an empty tree", () => {
    const tree: TreeNode = null;

    printTree(tree);

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("should correctly print a writable tree", () => {
    const tree: TreeNode = {
      name: ".",
      type: "inode/directory",
      children: [
        {
          name: "dir1",
          type: "inode/directory",
          children: [
            {
              name: "file2.txt",
              type: "text/plain",
              children: [],
              isReadable: true,
              isWritable: true,
            },
          ],
          isReadable: true,
          isWritable: true,
        },
        {
          name: "file1.txt",
          type: "text/plain",
          children: [],
          isReadable: true,
          isWritable: true,
        },
      ],
      isReadable: true,
      isWritable: true,
    };

    printTree(tree);

    expect(consoleSpy).toHaveBeenCalledWith(".");
    expect(consoleSpy).toHaveBeenCalledWith("\tdir1");
    expect(consoleSpy).toHaveBeenCalledWith("\t\tfile2.txt");
    expect(consoleSpy).toHaveBeenCalledWith("\tfile1.txt");
  });
});
