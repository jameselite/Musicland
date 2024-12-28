/*
  Warnings:

  - A unique constraint covering the columns `[trackid,authorid]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_authorid_key";

-- DropIndex
DROP INDEX "Like_trackid_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_trackid_authorid_key" ON "Like"("trackid", "authorid");
