import { z } from "zod";
import { EventVisibility } from "@prisma/client";

export const eventCreateSchema = z
  .object({
    title: z.string().min(5).max(100),
    subtitle: z.string().min(5).max(100).optional(),
    description: z.string().min(10).max(10000),
    from: z.coerce.date(),
    to: z.coerce.date(),
    location: z.enum(["online", "location"]),
    address: z
      .object({
        city: z.string().min(3).max(100),
        place: z.string().min(3).max(100),
        coordinates: z.object({
          latitude: z.number().min(-90).max(90),
          longitude: z.number().min(-180).max(180),
        }),
      })
      .nullable()
      .optional(),
    tags: z.array(z.string()).optional(),
  })
  //todo show this validation error in RHF
  .refine(
    (data) => {
      const from = new Date(data.from);
      const to = new Date(data.to);
      return from <= to;
    },
    { message: "End date must be after start date", path: ["to"] }
  )
  .transform((data) => {
    return {
      ...data,
      address: data.location === "location" ? data.address : null,
    };
  })
  .sourceType();

export const eventUpdateSchema = eventCreateSchema.and(
  z.object({
    primaryColor: z.string().optional(),
    visibility: z.nativeEnum(EventVisibility).optional(),
  })
);
