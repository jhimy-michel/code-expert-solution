import jsonFile from "./data/data.json";
import { rootDirectoryName, studentRole } from "./utils/constant";

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


const buildTree = ()=>{
    
}
