/*
  Warnings:

  - Added the required column `examId` to the `ExamAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "examId" INTEGER NOT NULL;
