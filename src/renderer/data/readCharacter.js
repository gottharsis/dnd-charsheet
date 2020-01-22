import path from "path";
import fs from "fs";
const baseDir = "/home/ayush/.dndCharSheet";

/**
 * reads a character file in json format and returns the object with the data
 * @param {string} characterFile the path of the character file relative to the base dir
 * @returns an object with the character data
 */
export const readCharacter = async characterFile => {
  const filePath = path.join(baseDir, characterFile);
  const data = fs.readFileSync(filePath, "utf-8");
  const character = JSON.parse(data);
  return character;
};

/**
 * Reads the list of all characters in the file characters.json
 * @returns a list of character names and file paths
 */
export const characterList = async () => {
  const charFile = path.join(baseDir, "characters.json");
  try {
    const data = fs.readFileSync(charFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
