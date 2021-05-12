import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="nav">
      <div className="logo" onClick={() => router.push("/")}></div>
    </div>
  );
}
