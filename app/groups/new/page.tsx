import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db, groups, insertGroupSchema, members } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function NewGroup() {
  async function createGroup(formData: FormData) {
    "use server";

    const group = insertGroupSchema.safeParse({
      name: formData.get("groupName"),
      bio: formData.get("bio"),
    });

    if (!group.success) {
      return {
        errors: group.error.flatten().fieldErrors,
      };
    }

    const { userId } = auth();
    if (!userId) {
      throw new Error("You need to be signed in to create a group");
    }

    const [newGroup] = await db.insert(groups).values(group.data).returning();

    await db.insert(members).values({
      userId,
      groupId: newGroup.id,
      admin: true,
    });

    redirect(`/groups/${newGroup.id}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between">
        <h1 className="font-bold mb-6 text-2xl">Create a new group</h1>
        <form className="flex flex-col gap-12" action={createGroup}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="groupName">Group name</Label>
            <Input
              type="text"
              id="groupName"
              name="groupName"
              placeholder="Karasuno"
            />
            <span className="text-xs text-muted-foreground">
              What is the name of your group/club?
            </span>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="We are a high school in the Miyagi Prefecture coached by Keishin Ukai. Fly high!"
            />
            <span className="text-xs text-muted-foreground">
              Tell us a bit about your group, who is it for, what do you do?
            </span>
          </div>

          <Button type="submit" className="w-fit">
            Create group
          </Button>
        </form>
      </div>
    </main>
  );
}
