/*
  Warnings:

  - You are about to drop the column `bermuda_booyar` on the `Squards` table. All the data in the column will be lost.
  - You are about to drop the column `kalahari_booyar` on the `Squards` table. All the data in the column will be lost.
  - You are about to drop the column `purgatorio_booyar` on the `Squards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Squards" DROP COLUMN "bermuda_booyar",
DROP COLUMN "kalahari_booyar",
DROP COLUMN "purgatorio_booyar",
ADD COLUMN     "bermuda_position" INTEGER[],
ADD COLUMN     "kalahari_position" INTEGER[],
ADD COLUMN     "purgatorio_position" INTEGER[];
