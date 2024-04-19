import { db, groups, members } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getGroups(userId: string) {
  // select all groups where the user is a member
  const memberGroups = await db
    .select()
    .from(groups)
    .leftJoin(members, eq(groups.id, members.groupId))
    .where(eq(members.userId, userId));

  return memberGroups.map((mg) => mg.groups);
}

export default async function Groups() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You need to be signed in to view your groups");
  }
  const memberGroups = await getGroups(userId);

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between">
        <h1 className="font-bold mb-6 text-2xl">Your groups</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.bio}</TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary">
                    <Link href={`/groups/${group.id}`}>View group</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
