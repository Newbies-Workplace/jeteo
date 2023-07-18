import Link from "next/link";

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
      <Link href={"http://127.0.0.1:3001/api/auth/google/redirect"}>
        zaloguj z google
      </Link>
    </div>
  );
}
