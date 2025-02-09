"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { UpdateUserRequest } from "shared/model/user/request/updateUser.request";
import { convertStoragePath, convertUser } from "@/lib/data/converters";
import { UserResponse } from "shared/model/user/response/user.response";
import { createFile, deleteFile, replaceFile } from "@/app/api/storage/storage-service";

// Define Zod schema for UpdateUserRequest
const updateUserSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  jobTitle: z.string().optional(),
  description: z.string().optional(),
  socials: z.object({
    mail: z.string().email().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});

export const updateMyUser = async (
  userId: string,
  data: Partial<UpdateUserRequest>
): Promise<UserResponse> => {
  // Validate data using Zod schema
  const validatedData = updateUserSchema.parse(data);

  const session = await auth();
  const currentUserId = session?.user.id;

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await prisma.user.update({
    data: validatedData,
    where: {
      id: userId,
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