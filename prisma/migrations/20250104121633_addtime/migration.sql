/*
  Warnings:

  - Added the required column `created_at` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "created_at" TEXT NOT NULL;
