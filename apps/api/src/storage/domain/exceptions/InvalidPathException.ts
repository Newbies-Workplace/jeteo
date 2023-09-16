export class InvalidPathException extends Error {
    constructor(path: string, filename?: string) {
        super(filename ? `Invalid folder path: (${path}/${filename})` : `Invalid folder path: (${path})`);
        this.name = 'InvalidFolderPathException';
    }
}