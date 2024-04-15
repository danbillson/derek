import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <UserProfile path="/account" routing="path" />
    </div>
  );
}
