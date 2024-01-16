'use client';

import Image from 'next/image';

export default function UserImage() {
  const avatar = localStorage.getItem('user_image');

  return (
    <Image
      height={40}
      width={40}
      src={avatar || ''}
      className="h-8 w-8 rounded-full bg-slate-700 lg:h-10 lg:w-10"
      alt="user image"
      priority
    />
  );
}
