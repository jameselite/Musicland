-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "trackid" INTEGER NOT NULL,
    "authorid" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_trackid_authorid_key" ON "Comment"("trackid", "authorid");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_trackid_fkey" FOREIGN KEY ("trackid") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
