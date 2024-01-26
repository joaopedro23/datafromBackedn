-- CreateTable
CREATE TABLE "registros" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);
