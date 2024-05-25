import {
  BookOpen,
  Home,
  LayoutDashboard,
  LibraryBig,
  Users,
  UsersRound,
} from "lucide-react";

export const default_links = [
  {
    title: "Басты бет",
    href: "/",
    icon: <Home size={22} />,
  },
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    icon: <LibraryBig size={22} />,
  },
];

export const sidebar_links = [
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    icon: <BookOpen size={22} />,
  },
  // {
  //   title: "Байқау тесті",
  //   href: "#",
  //   disabled: true,
  // },
];

export const admin_links = [
  {
    title: "Админ панель",
    href: "/admin",
    icon: <LayoutDashboard size={22} />,
  },
  {
    title: "Қолданушылар",
    href: "/admin/users",
    icon: <UsersRound size={22} />,
  },
];

export const courseContent = [
  {
    id: 1,
    title: "Module 1: Introduction to Web Development",
    topics: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quibusdam assumenda repellendus cumque inventore enim minima hic, odit ullam, illum qui consequuntur reprehenderit dolorum eligendi nulla facere harum omnis corporis.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 2,
        title: "Topic 2: Introduction to CSS",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 3,
        title: "Topic 3: JavaScript Fundamentals",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Advanced Web Development",
    topics: [
      {
        id: 4,
        title: "Topic 1: Responsive Web Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 5,
        title: "Topic 2: Frontend Frameworks",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 6,
        title: "Topic 3: Backend Technologies",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  // Extra modules
  {
    id: 3,
    title: "Module 3: Web Design Principles",
    topics: [
      {
        id: 7,
        title: "Topic 1: UI/UX Fundamentals",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 8,
        title: "Topic 2: Color Theory",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 9,
        title: "Topic 3: Typography in Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Frontend Development Tools",
    topics: [
      {
        id: 10,
        title: "Topic 1: Version Control with Git",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 11,
        title: "Topic 2: Package Managers",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 12,
        title: "Topic 3: Task Runners and Bundlers",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Backend Development Fundamentals",
    topics: [
      {
        id: 13,
        title: "Topic 1: Server-side Languages",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 14,
        title: "Topic 2: Databases",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 15,
        title: "Topic 3: APIs and RESTful Services",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Advanced Frontend Development",
    topics: [
      {
        id: 16,
        title: "Topic 1: Advanced CSS Techniques",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 17,
        title: "Topic 2: Modern JavaScript Frameworks",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 18,
        title: "Topic 3: Frontend Performance Optimization",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
  {
    id: 7,
    title: "Module 7: Full Stack Development",
    topics: [
      {
        id: 19,
        title: "Topic 1: Integrating Frontend and Backend",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 20,
        title: "Topic 2: Authentication and Authorization",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 21,
        title: "Topic 3: Deployment Strategies",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
    ],
  },
];
