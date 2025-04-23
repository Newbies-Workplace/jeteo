"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { convertStoragePath, convertUser } from "@/lib/actions/converters";
import { UserResponse } from "@/lib/models/user.response";
import {
  createFile,
  deleteFile,
  replaceFile,
} from "@/app/api/storage/storage-service";
import { UserUpdateSchema, userUpdateSchema } from "@/lib/actions/schemas";

export const updateMyUser = async (
  data: UserUpdateSchema
): Promise<UserResponse> => {
  const session = await auth();
  const currentUserId = session?.user.id;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  const validatedData = userUpdateSchema.parse(data);

  const updatedUser = await prisma.user.update({
    data: {
      name: validatedData.name,
      jobTitle: validatedData.jobTitle,
      description: validatedData.description,
      mail: validatedData.socials?.mail ?? null,
      linkedin: validatedData.socials?.linkedin ?? null,
      twitter: validatedData.socials?.twitter ?? null,
      github: validatedData.socials?.github ?? null,
    },
    where: {
      id: currentUserId,
    },
  });

  return convertUser(updatedUser);
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

  if (!user.image) {
    return;
  }
  if (!user.image.startsWith("http")) {
    await deleteFile(user.image);
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: null,
    },
  });
};
