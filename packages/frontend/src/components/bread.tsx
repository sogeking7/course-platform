import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export const Bread = ({ breadcrumbs }) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
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
