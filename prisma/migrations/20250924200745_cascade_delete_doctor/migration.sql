-- DropForeignKey
ALTER TABLE "public"."Mapping" DROP CONSTRAINT "Mapping_doctorId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Mapping" ADD CONSTRAINT "Mapping_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
