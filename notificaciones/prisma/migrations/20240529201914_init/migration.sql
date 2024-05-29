/*
  Warnings:

  - You are about to drop the `Registros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Registros";

-- CreateTable
CREATE TABLE "registros" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);
