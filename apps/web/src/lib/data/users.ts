import { prisma } from "@/lib/prisma";
import { UserResponse } from "shared/model/user/response/user.response";
import { convertUser } from "@/lib/data/converters";
import { auth } from "@/lib/auth";

export const getMyUser = async (): Promise<UserResponse> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    //todo throw user not found
    throw "UserNotFoundException";
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    //todo throw user not found
    throw "UserNotFoundException";
  }

  return convertUser(user);
};
