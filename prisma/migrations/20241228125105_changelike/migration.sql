-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "trackid" INTEGER NOT NULL,
    "authorid" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_trackid_key" ON "Like"("trackid");

-- CreateIndex
CREATE UNIQUE INDEX "Like_authorid_key" ON "Like"("authorid");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_trackid_fkey" FOREIGN KEY ("trackid") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
