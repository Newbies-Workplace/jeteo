"use server";

import { UpdateUserRequest } from "shared/model/user/request/updateUser.request";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  createFile,
  deleteFile,
  replaceFile,
} from "@/app/api/storage/storage-service";
import { convertStoragePath } from "@/lib/data/converters";

//todo add zod
export const updateMyUser = async (data: UpdateUserRequest) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      image: data.image,
      jobTitle: data.jobTitle,
      description: data.description,
      mail: data.socials.mail,
      github: data.socials.github,
      twitter: data.socials.twitter,
      linkedin: data.socials.linkedin,
    },
  });
};

export const updateMyUserImage = async (
  form: FormData
): Promise<{ image: string }> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const image = form.get("image") as File;

  let filename: string;

  if (!user.image || user.image.startsWith("http")) {
    filename = await createFile(image, `/users/${userId}`);
  } else {
    filename = await replaceFile(image, user.image);
  }

  const filePath = `/users/${userId}/${filename}`;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: filePath,
    },
  });

  return { image: convertStoragePath(filePath) };
};

// todo fix
export const deleteMyUserImage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  if (!user.image || user.image.startsWith("http")) {
    return;
  }

  await deleteFile(user.image);
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: null,
    },
  });
};
