'use client';

import useLogoutMutation from '@/hooks/useLogoutMutation';
import { MdLogout } from 'react-icons/md';

export default function LogoutButton() {
  const { mutate, isPending } = useLogoutMutation();

  return (
    <button className="p-2" disabled={isPending} onClick={() => mutate()}>
      <MdLogout className="action-button" />
    </button>
  );
}
