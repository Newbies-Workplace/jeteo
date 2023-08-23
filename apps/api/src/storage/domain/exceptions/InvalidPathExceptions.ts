export class InvalidFolderPathException extends Error {
    constructor(path: string) {
        super(`Invalid folder path: (${path})`);
    }
}

export class InvalidFilenameException extends Error {
    constructor(path: string) {
        super(`Invalid filename: (${path})`);
    }
}

export class InvalidPathExceptions extends Error {
    constructor(path: string) {
        super(`Invalid path: (${path})`);
    }
}