-- CreateTable
CREATE TABLE "DinnerReservation" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "partySize" INTEGER NOT NULL,
    "leadName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "DinnerReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DinnerReservation_code_key" ON "DinnerReservation"("code");

-- CreateIndex
CREATE INDEX "DinnerReservation_date_idx" ON "DinnerReservation"("date");

-- CreateIndex
CREATE INDEX "DinnerReservation_email_idx" ON "DinnerReservation"("email");
