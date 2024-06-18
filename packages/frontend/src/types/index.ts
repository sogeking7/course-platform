import { z } from "zod";

export type User = z.infer<typeof createUserSchema> & {
  id: number;
  password?: string;
  profilePictureLink?: string;
  access_token?: string;
  accessToken?: string;
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
  lecture?: Lecture;
  // lectureId?: number;
  // questions: string;
};

export type Question = {
  id: number | string;
  text: string;
  options: string[];
  correctAnswer: string[];
  isMultipleChoice: boolean;
  points: number;
};

export type Topic = {
  id: number;
  name: string;
  description: string;
  text_material: string;
};

export type QuizResult = {
  grade: number;
  state: string;
  points: number;
};

export type ExamResult = User & {
  examResult: number;
};
export const inviteStudentToCourseSchema = z.object({
  email: z.string().trim().email("Электрондық почта дұрыс емес"),
});

export const createSectionSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  // description: z.string().trim().min(1, { message: "Қажет" }),
});

export const createLectureSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Қажет" }),
    videoUrl: z.string().trim().optional(),
    videoUrl_checked: z.boolean().default(false),
    content: z.string().trim().optional(),
    content_checked: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.videoUrl_checked) {
        return data.videoUrl && data.videoUrl.trim().length > 0;
      }
      return true;
    },
    {
      message: "Бейне URL мекенжайы қажет",
      path: ["videoUrl"],
    },
  )
  .refine(
    (data) => {
      if (data.content_checked) {
        return data.content && data.content.trim().length > 0;
      }
      return true;
    },
    {
      message: "Мазмұн қажет",
      path: ["content"],
    },
  );

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

const optionSchema = z.object({
  value: z.string().trim().min(1, { message: "Опция бос болмауы керек" }),
  isTrue: z.boolean().default(false),
});

const baseQuestionSchema = z.object({
  text: z.string().trim().min(1, { message: "Қажет" }),
  options: z
    .array(optionSchema)
    .min(2, { message: "Кем дегенде екі опция қажет" })
    .max(5, { message: "Ең көбі 5 опция қосуға болады" })
    .refine(
      (options) => options.filter((option) => option.isTrue).length === 1,
      { message: "Тек бір нұсқа ақиқат болуы керек" },
    )
    .refine(
      (options) =>
        new Set(options.map((option) => option.value)).size === options.length,
      { message: "Опция атаулары бірегей болуы керек" },
    ),
  isMultipleChoice: z.boolean().default(false),
  points: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(0).max(100, "Минимум 100"),
  ),
});

export const createQuestionSchema = baseQuestionSchema.extend({});

const questionWithIdSchema = baseQuestionSchema.extend({
  id: z.number(),
  selectedOption: z.string().min(1, "Жауапты бос калдырмаңыз"),
});

export const QuizFormSchema = z.object({
  questions: z.array(questionWithIdSchema),
});

export const createExamSchema = z.object({
  name: z.string().trim().min(1, { message: "Қажет" }),
  description: z.string().trim().min(1, { message: "Қажет" }),
  questions: z.string(),
  lectureId: z.number(),
});

export const createCourseSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Қажет" }),
    description: z.string().trim().min(1, { message: "Қажет" }),
    content: z.string().trim().optional(),
    content_checked: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.content_checked) {
        return data.content && data.content.trim().length > 0;
      }
      return true;
    },
    {
      message: "Content is required",
      path: ["content"],
    },
  );

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
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/webp",
];

export const fileSchema = z.object({
  file: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
    .refine((file) => file?.length == 1, "File is required.")
    .refine((file) => {
      return file[0]?.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file[0]?.type);
    }, "File must be a PNG"),
});
