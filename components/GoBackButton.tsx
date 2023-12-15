"use client";

import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="heading-s-text flex items-center gap-6 text-starlessNight dark:text-white"
      onClick={() => router.back()}
    >
      <MdKeyboardArrowLeft className="text-primary" />
      Go back
    </button>
  );
}
