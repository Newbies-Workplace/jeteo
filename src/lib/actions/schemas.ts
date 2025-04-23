import { z } from "zod";
import { EventVisibility } from "@prisma/client";
import { youtubeVideoIdFromUrl } from "@/lib/actions/converters";

const optionalField = <T>(schema: z.ZodType<T>) =>
  z.union([
    schema.optional(),
    z.literal("").transform((v) => (v === "" ? undefined : v)),
  ]);

// Shared schema for event creation and update
const baseEventSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: optionalField(z.string().min(5).max(100)),
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
});

export const eventCreateSchema = baseEventSchema
  .refine((data) => new Date(data.from) <= new Date(data.to), {
    message: "End date must be after start date",
    path: ["to"],
  })
  .transform((data) => ({
    ...data,
    address: data.location === "location" ? data.address : null,
  }))
  .sourceType();

export const eventUpdateSchema = baseEventSchema.partial().extend({
  primaryColor: z.string().optional(),
  visibility: z.nativeEnum(EventVisibility).optional(),
});

export type EventCreateSchema = z.infer<typeof eventCreateSchema>;
export type EventUpdateSchema = z.infer<typeof eventUpdateSchema>;

// Shared schema for lecture creation and update
const baseLectureSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(10000),
  from: z.string(),
  to: z.string(),
  youtubeVideoId: optionalField(
    z
      .string()
      .regex(
        /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
        { message: "Invalid YouTube URL" }
      )
      .transform(youtubeVideoIdFromUrl)
  ),
  speakersAndInvites: z.object({
    invites: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        mail: z.string().email(),
      })
    ),
    speakers: z.array(z.string()),
  }),
});

export const lectureCreateSchema = baseLectureSchema;
export const lectureUpdateSchema = baseLectureSchema.partial();

export type LectureCreateSchema = z.infer<typeof lectureCreateSchema>;
export type LectureUpdateSchema = z.infer<typeof lectureUpdateSchema>;

export const lectureRateSchema = z.object({
  overallRate: z.number().min(0).max(5),
  topicRate: z.number().min(0).max(5),
  opinion: z.string().max(1000).optional(),
});
export type LectureRateSchema = z.infer<typeof lectureRateSchema>;

export const userUpdateSchema = z
  .object({
    name: z.string(),
    image: z.string(),
    jobTitle: z.string(),
    description: z.string(),
    socials: z.object({
      mail: z.string().email().nullish(),
      github: z.string().url().nullish(),
      twitter: z.string().url().nullish(),
      linkedin: z.string().url().nullish(),
    }),
  })
  .partial();

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
