-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_authorid_fkey";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
