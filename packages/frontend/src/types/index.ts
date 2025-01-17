import { z } from "zod";

export type User = z.infer<typeof createUserSchema> & {
  id: number;
  password?: string;
  profilePictureLink?: string;
  access_token?: string;
  accessToken?: string;
  role?: UserRole;
  createdAt: string;
  editedAt: string;
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
  createdAt: string;
  editedAt: string;
};

type CourseEnrollment = {
  course?: Course;
  courseId?: number;
  user?: User;
  userId?: number;
  createdAt: string;
  editedAt: string;
};

export type Course = z.infer<typeof createCourseSchema> & {
  id: number;
  sections: Section[];
  users?: CourseEnrollment[];
  profilePictureLink?: string;
  createdAt: string;
  editedAt: string;
};

export type Section = z.infer<typeof createSectionSchema> & {
  id: number;
  course?: Course;
  courseId?: number;
  lectures: Lecture[];
  isLocked?: Boolean;
  averageScore?: number;
  createdAt: string;
  editedAt: string;
};

export type Lecture = z.infer<typeof createLectureSchema> & {
  id: number;
  section?: Section;
  sectionId?: number;
  exam?: Exam;
  examId?: number;
  isExamPassed?: Boolean;
  createdAt: string;
  editedAt: string;
};

export type Exam = z.infer<typeof createExamSchema> & {
  id: number;
  lecture?: Lecture;
  createdAt: string;
  editedAt: string;
  invitedExam?: InvitedExam[];
};

export type Question = {
  id: number | string;
  text: string;
  options: string[];
  correctAnswer: string[];
  isMultipleChoice: boolean;
  points: number;
  createdAt: string;
  editedAt: string;
};

export type Topic = {
  id: number;
  name: string;
  description: string;
  text_material: string;
  createdAt: string;
  editedAt: string;
};

export type QuizResult = {
  grade: number;
  state: string;
  points: number;
  createdAt: string;
  editedAt: string;
};

export type InvitedExam = {
  user?: User;
  userId?: number;
  exam?: Exam;
  examId: number;
  createdAt: string;
  editedAt: string;
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
  name: z.string().trim().min(1, { message: "Сұрақ қажет" }),
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
      message: "Қажет",
      path: ["content"],
    },
  );

export const editUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Қажет" }),
  lastName: z.string().trim().min(1, { message: "Қажет" }),
  email: z.string().trim().email("Электрондық почта дұрыс емес"),
});

export const createUserSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: "Қажет" }),
    lastName: z.string().trim().min(1, { message: "Қажет" }),
    email: z.string().trim().email("Электрондық почта дұрыс емес"),
    password: z
      .union([
        z
          .string({ message: "Қажет" })
          .trim()
          .min(8, { message: "Құпия сөз кемінде 8 таңбадан тұруы керек" })
          .max(20, { message: "Құпия сөз 20 таңбадан аспауы керек" })
          .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
            message:
              "Құпия сөзде кем дегенде бір әріп және бір сан болуы керек",
          }),
        z.string().length(0),
      ])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    repeatPassword: z
      .union([z.string().length(0), z.string({ message: "Қажет" }).trim()])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    changePassword_checked: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.changePassword_checked === false) return true;
      else {
        return data.password === data.repeatPassword;
      }
    },
    {
      message: "Құпия сөздер сәйкес келмейді",
      path: ["repeatPassword"], // path indicates where the error message should be placed
    },
  )
  .refine(
    (data) => {
      if (data.changePassword_checked) {
        // return data.password && data.password.trim().length > 0;
      }
      return true;
    },
    {
      message: "Қажет",
      path: ["password", "repeatPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.changePassword_checked) {
        // return data.repeatPassword && data.repeatPassword.trim().length > 0;
      }
      return true;
    },
    {
      message: "Қажет",
      path: ["repeatPassword"],
    },
  );

export type Error = {
  statusCode: number;
  message: string;
};

export const loginSchema = z.object({
  email: z
    .string({ message: "Қажет" })
    .trim()
    .email("Электрондық почта дұрыс емес"),
  password: z
    .string({ message: "Қажет" })
    .trim()
    .min(8, { message: "Құпия сөз кемінде 8 таңбадан тұруы керек" }),
  // .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
  //   message: "Құпия сөзде кем дегенде бір әріп және бір сан болуы керек",
  // }),
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
