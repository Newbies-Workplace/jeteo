import { InviteDetailsResponse } from "shared/model/invite/response/inviteResponse";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertInviteDetails } from "@/lib/data/converters";

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
