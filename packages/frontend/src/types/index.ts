import { z } from "zod";

export type User = z.infer<typeof createUserSchema> & {
  id: number;
  password?: string;
  profilePictureLink?: string;
  access_token?: string;
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
  profilePictureLink?: string;
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
  email: z.string().trim().email("Электрондық почта дұрыс емес"),
});

export const createSectionSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  // description: z.string().trim().min(1, { message: "Қажет" }),
});

export const createLectureSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  content: z.string().trim().min(1, { message: "Қажет" }),
  videoUrl: z.string().trim().min(1, { message: "Қажет" }),
});

const questionSchema = z.object({
  name: z.string().trim().min(1, { message: "Сурақ қажет" }),
  answers: z
    .array(
      z.object({
        name: z.string().trim().min(1, { message: "Жауап қажет" }),
        isCorrect: z.boolean(),
      }),
    )
    .min(1, { message: "Кем дегенде 1 cұрақ қажет" }),
});

export const createExamSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  description: z.string().trim().min(1, { message: "Қажет" }),
  questions: z
    .string()
    .trim()
    .min(1, { message: "Қажет" })
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        throw new Error("Сұрақтар үшін жарамсыз JSON форматы");
      }
    })
    .refine((val) => Array.isArray(val), {
      message: "Сұрақтар массив болуы керек",
    })
    .refine(
      (val) =>
        val.every(
          (question: any) => questionSchema.safeParse(question).success,
        ),
      { message: "Сұрақ форматы жарамсыз" },
    ),
});

export const createCourseSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  description: z.string().trim().min(1, { message: "Қажет" }),
  content: z.string().trim().min(1, { message: "Қажет" }),
});

export const editUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Қажет" }),
  lastName: z.string().trim().min(1, { message: "Қажет" }),
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
      .min(6, { message: "Құпия сөз кемінде 6 таңбадан тұруы керек" })
      .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
        message: "Құпия сөзде кем дегенде бір әріп және бір сан болуы керек",
      }),
    repeatPassword: z
      .string()
      .trim()
      .min(6, { message: "Құпия сөз кемінде 6 таңбадан тұруы керек" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Құпия сөздер сәйкес келмейді",
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
    .min(6, { message: "Құпия сөз кемінде 6 таңбадан тұруы керек" })
    .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
      message: "Құпия сөзде кем дегенде бір әріп және бір сан болуы керек",
    }),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/gif", "image/jpeg"];

export const fileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required.")
    .refine((file) => {
      return file[0]?.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file[0]?.type);
    }, "File must be a PNG"),
});
