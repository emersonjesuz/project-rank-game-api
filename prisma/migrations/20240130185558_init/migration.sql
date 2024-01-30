-- CreateTable
CREATE TABLE "Squards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "booyar" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "bermuda_position" INTEGER[],
    "purgatorio_position" INTEGER[],
    "kalahari_position" INTEGER[],

    CONSTRAINT "Squards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "squard_id" INTEGER NOT NULL,
    "bermuda_kills" INTEGER[],
    "purgatorio_kills" INTEGER[],
    "kalahari_kills" INTEGER[],
    "kills" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Squards_name_key" ON "Squards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Players_name_key" ON "Players"("name");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_squard_id_fkey" FOREIGN KEY ("squard_id") REFERENCES "Squards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
