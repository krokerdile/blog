import { redirect } from "next/navigation";

export default function LegacyBackofficePage() {
  redirect("/admin");
}
