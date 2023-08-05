/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoriteId";
