/*
  Warnings:

  - The primary key for the `Highscore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Highscore` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Highscore` DROP FOREIGN KEY `Highscore_userId_fkey`;

-- AlterTable
ALTER TABLE `Highscore` DROP PRIMARY KEY,
    DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Highscore` ADD CONSTRAINT `Highscore_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
