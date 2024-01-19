'use client';

import { UserContext, UserContextType } from '@/providers/UserProvider';
import Image from 'next/image';
import { useContext } from 'react';
import { FaUser } from 'react-icons/fa';

export default function UserImage() {
  const { user } = useContext(UserContext) as UserContextType;

  if (!user?.avatar) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 lg:h-10 lg:w-10">
        <FaUser className="text-base text-primary" />
      </div>
    );
  }

  return (
    <Image
      height={40}
      width={40}
      src={user.avatar}
      className="h-8 w-8 rounded-full bg-slate-700 lg:h-10 lg:w-10"
      alt={`${user.firstName} ${user.lastName}'s avatar`}
      priority
    />
  );
}
