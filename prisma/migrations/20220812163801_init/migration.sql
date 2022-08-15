-- CreateTable
CREATE TABLE "Club" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventCount" INTEGER NOT NULL,
    "business_status" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratings_total" INTEGER NOT NULL,
    "types" TEXT[],
    "address" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_place_id_key" ON "Club"("place_id");
