import process from "process";
import fs from "fs";
import { randomUUID } from "crypto";
import { parse } from "path";

const storagePath = process.env["STORAGE_PATH"] ?? "/jeteo-api-storage";

export const getFile = (folderPath: string): fs.ReadStream => {
  if (!isValidPath(folderPath)) {
    throw new InvalidPathException(folderPath);
  }

  return fs.createReadStream(formatPath(folderPath));
};

export const createFile = async (
  file: Buffer,
  folderPath: string
): Promise<string> => {
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  if (!isValidPath(folderPath)) {
    console.error(`invalid folder path ${folderPath}`);
    throw new InvalidPathException(folderPath);
  }

  const filename = randomUUID();

  createPathIfMissing(folderPath);
  await fs.promises.writeFile(formatPath(folderPath, filename), file);
  return filename;
};

export const deleteFile = async (filePath: string): Promise<void> => {
  if (!isValidPath(filePath)) {
    throw new InvalidPathException(filePath);
  }
  await fs.promises.unlink(formatPath(filePath)).catch(() => {
    console.error(`file ${filePath} not found`);
  });
};

export const replaceFile = async (
  file: Buffer,
  filePath: string
): Promise<string> => {
  await deleteFile(filePath);
  return createFile(file, parse(filePath).dir);
};

const formatPath = (folderPath: string, filename?: string): string => {
  return `${storagePath}${folderPath}${filename ? `/${filename}` : ""}`;
};

const createPathIfMissing = (folderPath: string): void => {
  if (!isValidFolderPath(folderPath))
    throw new InvalidPathException(folderPath);
  folderPath = storagePath + folderPath;

  if (!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath, {
      recursive: true,
    });
};

export const isValidPath = (folderPath: string, filename?: string): boolean => {
  if (!filename) {
    const parsedPath = parse(folderPath);
    folderPath = parsedPath.dir;
    filename = parsedPath.base;
  }

  return isValidFolderPath(folderPath) && isValidFileName(filename);
};

const isValidFileName = (filename: string): boolean => {
  const pathRegex = /^[a-zA-Z\-0-9]+$/g;
  return pathRegex.test(filename);
};

const isValidFolderPath = (folderPath: string): boolean => {
  const pathRegex = /^(\/[a-zA-Z\-0-9]+)+$/g;
  return pathRegex.test(folderPath);
};

export class InvalidPathException extends Error {
  constructor(path: string, filename?: string) {
    super(
      filename
        ? `Invalid folder path: (${path}/${filename})`
        : `Invalid folder path: (${path})`
    );
  }
}
