import {StorageService} from './storage.service';
import {randomUUID} from 'crypto';

describe('UserService', () => {
    describe.each([
        { path: `/user/${randomUUID()}/${randomUUID()}`, expected: true },
        { path: `/user/${randomUUID()}`, expected: true },
        { path: '../user', expected: false },
        { path: '/user/../../../user', expected: false },
        { path: 'user/${randomUUID()}/${randomUUID()}', expected: false },
        { path: '../', expected: false }
    ])('.validatePath("$path")', ({path, expected}) => {
        let storageService = new StorageService();
        test(`should return ${expected}`, async () => {
            expect(storageService.isValidPath(path)).toBe(expected);
        });
    });
});