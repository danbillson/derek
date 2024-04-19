import { Button } from "@/components/ui/button";
import { db, groups } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getGroup(id: string) {
  try {
    const [group] = await db.select().from(groups).where(eq(groups.id, id));

    return group;
  } catch (error) {
    return notFound();
  }
}

export default async function Group({ params }: { params: { id: string } }) {
  const { id } = params;
  const group = await getGroup(id);

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <div className="flex w-full max-w-5xl items-center justify-between mb-14">
        <div>
          <h1 className="font-bold mb-6 text-2xl">{group.name}</h1>
          <p>{group.bio}</p>
        </div>
        <Button>
          <Link href="/groups">View all groups</Link>
        </Button>
      </div>
      <div className="grid w-full max-w-5xl items-center gap-12 ">
        <h2 className="font-bold text-lg">Upcoming sessions</h2>
      </div>
    </main>
  );
}
