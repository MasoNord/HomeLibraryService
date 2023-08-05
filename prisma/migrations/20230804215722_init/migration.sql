/*
  Warnings:

  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `albumId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `favoriteId` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favoriteId` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Favorite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `favoriteId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_trackId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favoriteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favoriteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
DROP COLUMN "albumId",
DROP COLUMN "artistId",
DROP COLUMN "trackId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favoriteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
