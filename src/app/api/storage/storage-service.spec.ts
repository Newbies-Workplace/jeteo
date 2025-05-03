import { randomUUID } from "crypto";
import { expect, describe } from "@jest/globals";
import { isValidPath } from "@/app/api/storage/storage-service";

describe("storage-service", () => {
  describe.each([
    { path: `/user/${randomUUID()}/${randomUUID()}`, expected: true },
    { path: `/user/${randomUUID()}`, expected: true },
    { path: "../user", expected: false },
    { path: "/user/../../../user", expected: false },
    { path: "user/${randomUUID()}/${randomUUID()}", expected: false },
    { path: "../", expected: false },
  ])('.validatePath("$path")', ({ path, expected }) => {
    test(`should return ${expected}`, async () => {
      expect(isValidPath(path)).toBe(expected);
    });
  });
});
