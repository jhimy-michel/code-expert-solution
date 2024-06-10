/**
 * Interface for the file/folder data items
 */
export interface FilesDataType {
    _id: string;
    originKey: string;
    originVersion: number;
    userId: string;
    projectId: string;
    version: number;
    key: string;
    current: boolean;
    createdAt: string;
    type: string;
    name: string;
    permissions: {
      phase: string[];
      read: string[];
      write: string[];
    };
    children: string[];
    replacedAt: string;
  }
  