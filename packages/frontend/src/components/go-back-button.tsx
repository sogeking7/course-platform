"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      className="text-neutral-800 flex items-center h-9 w-9"
      onClick={handleGoBack}
    >
      <ArrowLeft className=" inline" size={24} />
    </button>
  );
};
