import { FilesDataType } from "../data/dataType";
import { mockData } from "../data/mockData";
import { buildTree } from "./buildTree";
import { TreeNode } from "./treeType";

describe("buildTree function", () => {
  test("should build the tree correctly for the given mock data", () => {
    const rootKey = "root";
    const studentRole = "student";
    const currentDept = 0;

    const expectedTree: TreeNode = {
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

    const result = buildTree(rootKey, studentRole, mockData, currentDept);
    expect(result).toEqual(expectedTree);
  });

  test("should return null if root node is not found", () => {
    const rootKey = "non-existent";
    const studentRole = "student";
    const currentDept = 0;

    const result = buildTree(rootKey, studentRole, mockData, currentDept);
    expect(result).toBeNull();
  });

  test("should not include nodes that are not readable by the student", () => {
    const modifiedMockData: FilesDataType[] = [
      ...mockData,
      {
        _id: "5",
        originKey: "dir1",
        originVersion: 1,
        userId: "user1",
        projectId: "project1",
        version: 1,
        key: "dir3",
        current: true,
        createdAt: "2022-01-01T00:00:00.000Z",
        type: "inode/directory",
        name: "dir3",
        permissions: {
          phase: [],
          read: ["teacher"],
          write: ["teacher"],
        },
        children: [],
        replacedAt: null,
      },
    ];

    const rootKey = "root";
    const studentRole = "student";
    const currentDept = 0;

    const result = buildTree(rootKey, studentRole, modifiedMockData, currentDept);

    const expectedTreeWithoutUnreadableNodes: TreeNode = {
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

    expect(result).toEqual(expectedTreeWithoutUnreadableNodes);
  });
});
