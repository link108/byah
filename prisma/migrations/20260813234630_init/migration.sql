-- CreateTable
CREATE TABLE "Brewery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brewery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beer" (
    "id" TEXT NOT NULL,
    "breweryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerRating" (
    "id" TEXT NOT NULL,
    "beerId" TEXT NOT NULL,
    "raterName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeerRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BbqTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BbqTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "addedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodRating" (
    "id" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "raterName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brewery_name_key" ON "Brewery"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Beer_breweryId_name_key" ON "Beer"("breweryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "BeerRating_beerId_raterName_key" ON "BeerRating"("beerId", "raterName");

-- CreateIndex
CREATE UNIQUE INDEX "BbqTeam_name_key" ON "BbqTeam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_teamId_label_key" ON "FoodItem"("teamId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "FoodRating_foodItemId_raterName_key" ON "FoodRating"("foodItemId", "raterName");

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_breweryId_fkey" FOREIGN KEY ("breweryId") REFERENCES "Brewery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerRating" ADD CONSTRAINT "BeerRating_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "BbqTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodRating" ADD CONSTRAINT "FoodRating_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
