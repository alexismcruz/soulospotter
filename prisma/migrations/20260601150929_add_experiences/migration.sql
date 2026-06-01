-- CreateEnum
CREATE TYPE "ExperienceCategory" AS ENUM ('OUTDOOR_ADVENTURE', 'FOOD_DRINK', 'ARTS_CULTURE', 'WELLNESS_MINDFULNESS', 'NIGHTLIFE_SOCIAL', 'DAY_TRIPS', 'PHOTOGRAPHY_WALKS', 'FITNESS_SPORTS');

-- CreateEnum
CREATE TYPE "ExperienceSubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "ExperienceOrganizer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienceOrganizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "category" "ExperienceCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "groupSizeMin" INTEGER NOT NULL,
    "groupSizeMax" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "bookingUrl" TEXT NOT NULL,
    "photoUrl" TEXT,
    "organizerId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "groupSizeMin" INTEGER NOT NULL,
    "groupSizeMax" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "bookingUrl" TEXT NOT NULL,
    "photoUrl" TEXT,
    "organizerName" TEXT NOT NULL,
    "organizerEmail" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "notes" TEXT,
    "status" "ExperienceSubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienceSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceOrganizer_email_key" ON "ExperienceOrganizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE INDEX "Experience_cityId_idx" ON "Experience"("cityId");

-- CreateIndex
CREATE INDEX "Experience_category_idx" ON "Experience"("category");

-- CreateIndex
CREATE INDEX "Experience_isFeatured_idx" ON "Experience"("isFeatured");

-- CreateIndex
CREATE INDEX "Experience_isActive_idx" ON "Experience"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceSubmission_organizerEmail_key" ON "ExperienceSubmission"("organizerEmail");

-- CreateIndex
CREATE INDEX "ExperienceSubmission_status_idx" ON "ExperienceSubmission"("status");

-- CreateIndex
CREATE INDEX "ExperienceSubmission_createdAt_idx" ON "ExperienceSubmission"("createdAt");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "ExperienceOrganizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
