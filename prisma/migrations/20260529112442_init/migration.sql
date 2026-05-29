-- CreateEnum
CREATE TYPE "Region" AS ENUM ('NORTH_AMERICA', 'LATIN_AMERICA', 'EUROPE', 'MIDDLE_EAST_AFRICA', 'SOUTH_ASIA', 'SOUTHEAST_ASIA', 'EAST_ASIA', 'OCEANIA');

-- CreateEnum
CREATE TYPE "CostLevel" AS ENUM ('BUDGET', 'MID_RANGE', 'EXPENSIVE');

-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('FREE', 'BUDGET', 'MID', 'HIGH');

-- CreateEnum
CREATE TYPE "SpotCategory" AS ENUM ('ACCOMMODATION', 'CAFE', 'COWORKING', 'FOOD', 'WELLNESS', 'COMMUNITY', 'NATURE', 'CULTURE', 'NIGHTLIFE', 'TRANSPORT');

-- CreateEnum
CREATE TYPE "AffiliateProvider" AS ENUM ('BOOKING_COM', 'HOSTELWORLD', 'AIRBNB', 'SAFETYWING', 'WORLD_NOMADS', 'AIRALO', 'GETYOURGUIDE', 'VIATOR', 'OTHER');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "flagEmoji" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "timezone" TEXT,
    "currency" TEXT,
    "language" TEXT,
    "safetyScore" INTEGER,
    "costLevel" "CostLevel",
    "seoTitle" TEXT,
    "seoDesc" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "category" "SpotCategory" NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "website" TEXT,
    "imageUrl" TEXT,
    "priceRange" "PriceRange",
    "rating" DOUBLE PRECISION,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" TEXT NOT NULL,
    "spotId" TEXT,
    "provider" "AffiliateProvider" NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityTag" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "CityTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotTag" (
    "id" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "SpotTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE INDEX "City_region_idx" ON "City"("region");

-- CreateIndex
CREATE INDEX "City_published_idx" ON "City"("published");

-- CreateIndex
CREATE INDEX "Spot_cityId_category_idx" ON "Spot"("cityId", "category");

-- CreateIndex
CREATE INDEX "Spot_published_idx" ON "Spot"("published");

-- CreateIndex
CREATE UNIQUE INDEX "Spot_cityId_slug_key" ON "Spot"("cityId", "slug");

-- CreateIndex
CREATE INDEX "CityTag_tag_idx" ON "CityTag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "CityTag_cityId_tag_key" ON "CityTag"("cityId", "tag");

-- CreateIndex
CREATE INDEX "SpotTag_tag_idx" ON "SpotTag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "SpotTag_spotId_tag_key" ON "SpotTag"("spotId", "tag");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityTag" ADD CONSTRAINT "CityTag_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTag" ADD CONSTRAINT "SpotTag_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
