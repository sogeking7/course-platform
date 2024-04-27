import { CourseCard } from "@/components/course/course-card";
import { HomeHeader } from "@/components/header/home/header";
import { Course } from "../../../../types";

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
    <div>
      <HomeHeader title={pageTitle} />
      <div className="px  -12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 basic:grid-cols-1 gap-8">
            {data.map((course: Course) => (
              <CourseCard item={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
