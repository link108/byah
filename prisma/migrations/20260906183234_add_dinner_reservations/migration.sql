-- CreateTable
CREATE TABLE "DinnerNight" (
    "date" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 24,
    "bookedSeats" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DinnerNight_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "DinnerReservation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "partySize" INTEGER NOT NULL,
    "leadName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DinnerReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DinnerReservation_code_key" ON "DinnerReservation"("code");

-- CreateIndex
CREATE INDEX "DinnerReservation_email_idx" ON "DinnerReservation"("email");

-- CreateIndex
CREATE INDEX "DinnerReservation_date_idx" ON "DinnerReservation"("date");

-- AddForeignKey
ALTER TABLE "DinnerReservation" ADD CONSTRAINT "DinnerReservation_date_fkey" FOREIGN KEY ("date") REFERENCES "DinnerNight"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
