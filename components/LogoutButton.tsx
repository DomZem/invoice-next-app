'use client';

import useLogout from '@/hooks/auth/useLogout';
import { MdLogout } from 'react-icons/md';

export default function LogoutButton() {
  const { mutate, isPending } = useLogout();

  return (
    <button className="p-2" disabled={isPending} onClick={() => mutate()}>
      <MdLogout className="action-button" />
    </button>
  );
}
