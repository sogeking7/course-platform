import { z } from "zod";

export type Auth = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureLink?: string;
  role: UserRole;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePictureLink?: string;
  role: UserRole;
};

export type Module = {
  id: number;
  name: string;
  description: string;
  course_id: number | null;
  profile_image: string;
};

export type Course = {
  id: number;
  name: string;
  description: string;
};

export type Topic = {
  id: number;
  name: string;
  description: string;
  text_material: string;
};

export const createCourseSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  description: z.string().trim().min(1, { message: "Required" }),
});

export const editUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Required" }),
  lastName: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().email(),
});

export const createUserSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "Қажет" }),
    lastName: z.string().trim().min(1, { message: "Қажет" }),
    email: z.string().trim().email("Электрондық почта дұрыс емес"),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
        message: "Password must contain at least one letter and one number",
      }),
    repeatPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"], // path indicates where the error message should be placed
  });

export type Error = {
  statusCode: number;
  message: string;
};

export const loginSchema = z.object({
  email: z.string().trim().email("Электрондық почта дұрыс емес"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
      message: "Password must contain at least one letter and one number",
    }),
});
