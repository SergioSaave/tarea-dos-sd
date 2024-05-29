-- CreateTable
CREATE TABLE "Registros" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Registros_pkey" PRIMARY KEY ("id")
);
