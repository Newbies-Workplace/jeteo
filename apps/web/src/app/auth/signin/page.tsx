import Link from "next/link";
import { LectureCard } from "@/components/lectureCard/LectureCard";

export default async function Page() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Link href={"http://127.0.0.1:3001/api/auth/google/redirect"}>
        zaloguj z google
      </Link> */}
      <LectureCard 
        startingHour="14:35"
        endingHour="15:55"
      />
    </div>
  );
}
