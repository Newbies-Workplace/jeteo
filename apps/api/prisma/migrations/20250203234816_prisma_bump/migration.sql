-- AlterTable
ALTER TABLE "_LectureSpeakers" ADD CONSTRAINT "_LectureSpeakers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_LectureSpeakers_AB_unique";
