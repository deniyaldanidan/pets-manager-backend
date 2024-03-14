-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('PUPPYHOOD', 'ADOLESCENCE', 'ADULTHOOD', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ApproveStatus" AS ENUM ('APPROVED', 'WAITING', 'CORRECTION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "refresh" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PetType" NOT NULL,
    "age" "PetAge" NOT NULL,
    "gender" "PetGender" NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "neutered" BOOLEAN NOT NULL,
    "sprayed" BOOLEAN NOT NULL,
    "shots_uptodate" BOOLEAN NOT NULL,
    "reason" TEXT NOT NULL,
    "approved" "ApproveStatus" NOT NULL DEFAULT 'WAITING',
    "breed_id" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" SERIAL NOT NULL,
    "type" "PetType" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetReqs" (
    "id" SERIAL NOT NULL,
    "admin_note" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,

    CONSTRAINT "PetReqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_slug_key" ON "Breed"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PetReqs_pet_id_key" ON "PetReqs"("pet_id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetReqs" ADD CONSTRAINT "PetReqs_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
