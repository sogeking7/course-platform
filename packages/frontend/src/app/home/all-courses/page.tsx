import { CourseCard } from "@/components/course/course-card";
import { Course } from "../../../types";
import { MyContainer } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography";

const pageTitle = "Курстар";

const data = [
  { name: "Computer Organization and Architecture" },
  { name: "Advanced Databases (NoSQL)" },
  { name: "Probability and Statistics" },
  { name: "Computational Mathematics" },
  { name: "Web Technologies 1 (Frontend)" },
  { name: "Sociology (1st year students)" },
  { name: "Algorithms and Data Structures" },
  { name: "History of Kazakhstan" },
  { name: "Psychology (1st year students)" },
  { name: "Cultural Studies" },
  { name: "Discrete Mathematics" },
  { name: "Object-oriented programming (Java)" },
  { name: "Political science (1st year students)" },
  { name: "Calculus 1" },
  { name: "Linear Algebra" },
  { name: "Information and Communication Technologies" },
];

export default function AllCoursesPage() {
  return (
    <MyContainer>
      <TypographyH1>Courses</TypographyH1>
      <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-8">
        {data.map((course, ind) => (
          <CourseCard key={ind} item={course as Course} />
        ))}
      </div>
    </MyContainer>
  );
}
