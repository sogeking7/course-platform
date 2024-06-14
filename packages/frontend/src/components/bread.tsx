import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChevronLeft } from "lucide-react";

export const Bread = ({
  breadcrumbs,
}: {
  breadcrumbs: {
    name: string;
    path: string;
  }[];
}) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild className="flex items-center">
              <Link href={breadcrumb.path}>
                {!!(index === 0) && <ChevronLeft className="inline size-5" />}
                {breadcrumb.name}
              </Link>
            </BreadcrumbLink>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
