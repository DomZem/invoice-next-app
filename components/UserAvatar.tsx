'use client';

import useUser from '@/hooks/useUser';
import { FaUser } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from './UI/Avatar';
import Loading from './UI/Loading';

export default function UserAvatar() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!user || error) {
    return (
      <div className="rounded-full bg-primary p-0.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-darkAbyss lg:h-10 lg:w-10">
          <FaUser className="text-base text-bluebellGray" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-full bg-primary p-0.5">
      <Avatar>
        <AvatarImage src={user.avatar} />

        <AvatarFallback className="uppercase">
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
