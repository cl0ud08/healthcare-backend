-- DropForeignKey
ALTER TABLE "public"."Mapping" DROP CONSTRAINT "Mapping_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mapping" ADD CONSTRAINT "Mapping_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
