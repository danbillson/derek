import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {user ? user.firstName : "Hello"}! Welcome to Derek
      </div>
      <Button>This button does nothing</Button>
    </main>
  );
}
