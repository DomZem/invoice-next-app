'use client';

import { useRouter } from 'next/navigation';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-6 text-heading-s text-starlessNight dark:text-white"
      onClick={() => router.back()}
    >
      <MdKeyboardArrowLeft className="text-primary" />
      Go back
    </button>
  );
}
