"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { assertInviteWriteAccess } from "../data/auth.methods";

// Define Zod schema for InviteRequest
const inviteSchema = z.object({
  status: z.string().optional(),
});

export const acceptInvite = async (id: string) => {
    const session = await auth();
    const userId = session?.user.id;
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    const invite = await prisma.invite.findUniqueOrThrow({
      where: {
        id,
      },
    });
  
    assertInviteWriteAccess(invite);
  
    await prisma.lecture.update({
      where: {
        id: invite.lectureId,
      },
      data: {
        Speakers: {
          connect: {
            id: userId,
          },
        },
        Invites: {
          delete: {
            id: invite.id,
          },
        },
      },
    });
  };
  
  export const rejectInvite = async (id: string) => {
    const session = await auth();
    const userId = session?.user.id;
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    const invite = await prisma.invite.findUniqueOrThrow({
      where: {
        id,
      },
    });
  
    assertInviteWriteAccess(invite);
  
    await prisma.invite.delete({
      where: { id },
    });
  };
  