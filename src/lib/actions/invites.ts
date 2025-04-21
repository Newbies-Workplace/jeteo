"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { assertInviteWriteAccess } from "@/lib/actions/auth.methods";
import { convertInviteDetails } from "@/lib/actions/converters";
import { InviteDetailsResponse } from "@/lib/models/invite.response";

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

  await assertInviteWriteAccess(invite);

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

  await assertInviteWriteAccess(invite);

  await prisma.invite.delete({
    where: { id },
  });
};

export const getMyInvites = async (): Promise<InviteDetailsResponse[]> => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    //todo throw user not found
    throw "UserNotFoundException";
  }

  const invites = await prisma.invite.findMany({
    where: {
      //todo: use something different than google_mail
      mail: user.google_mail,
    },
  });

  return await Promise.all(
    invites.map((invite) => convertInviteDetails(invite))
  );
};
