import { z } from "zod";

export type User = z.infer<typeof createUserSchema> & {
  id: number;
  password?: string;
  profilePictureLink?: string;
  role?: UserRole;
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

type CourseEnrollment = {
  course?: Course;
  courseId?: number;
  user?: User;
  userId?: number;
};

export type Course = z.infer<typeof createCourseSchema> & {
  id: number;
  sections: Section[];
  users?: CourseEnrollment[];
};

export type Section = z.infer<typeof createSectionSchema> & {
  id: number;
  course?: Course;
  courseId?: number;
  lectures: Lecture[];
};

export type Lecture = z.infer<typeof createLectureSchema> & {
  id: number;
  section?: Section;
  sectionId?: number;
  exam?: Exam;
  examId?: number;
};

export type Exam = z.infer<typeof createExamSchema> & {
  id: number;
  lecture: Lecture;
};

export type Topic = {
  id: number;
  name: string;
  description: string;
  text_material: string;
};

export const inviteStudentToCourseSchema = z.object({
  email: z.string().trim().email(),
});

export const createSectionSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  description: z.string().trim().min(1, { message: "Required" }),
});

export const createLectureSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  content: z.string().trim().min(1, { message: "Required" }),
});

const questionSchema = z.object({
  name: z.string().trim().min(1, { message: "Question name is required" }),
  answers: z
    .array(
      z.object({
        name: z.string().trim().min(1, { message: "Answer name is required" }),
        isCorrect: z.boolean(),
      }),
    )
    .min(1, { message: "At least one answer is required" }),
});

export const createExamSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  description: z.string().trim().min(1, { message: "Required" }),
  questions: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        throw new Error("Invalid JSON format for questions");
      }
    })
    .refine((val) => Array.isArray(val), {
      message: "Questions should be an array",
    })
    .refine(
      (val) =>
        val.every(
          (question: any) => questionSchema.safeParse(question).success,
        ),
      { message: "Invalid question format" },
    ),
});

export const createCourseSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  description: z.string().trim().min(1, { message: "Required" }),
  content: z.string().trim().min(1, { message: "Required" }),
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
