-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lectureId_fkey";

-- AlterTable
ALTER TABLE "Event"
    DROP COLUMN "links";
ALTER TABLE "Event"
    RENAME COLUMN "userId" TO "authorId";

-- AlterTable
ALTER TABLE "Lecture"
    RENAME COLUMN "userId" TO "authorId";
ALTER TABLE "Lecture"
    ALTER COLUMN "createdAt" SET NOT NULL,
    ALTER COLUMN "eventId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_LectureSpeakers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

INSERT INTO "_LectureSpeakers" ("A", "B") SELECT "lectureId", "id" FROM "User" where "lectureId" is not null;

-- CreateIndex
CREATE UNIQUE INDEX "_LectureSpeakers_AB_unique" ON "_LectureSpeakers"("A", "B");

-- CreateIndex
CREATE INDEX "_LectureSpeakers_B_index" ON "_LectureSpeakers"("B");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lectureId";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureSpeakers" ADD CONSTRAINT "_LectureSpeakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureSpeakers" ADD CONSTRAINT "_LectureSpeakers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
