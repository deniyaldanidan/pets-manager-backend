/*
  Warnings:

  - The `approved` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PetReqs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[petId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetReqs" DROP CONSTRAINT "PetReqs_pet_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "approved_at" TIMESTAMP(3),
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "info" TEXT NOT NULL,
ADD COLUMN     "petId" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "approved",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PetReqs";

-- DropEnum
DROP TYPE "ApproveStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Pet_petId_key" ON "Pet"("petId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
