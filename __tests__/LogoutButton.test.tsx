import LogoutButton from '@/components/LogoutButton';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
}));

describe('LogoutButton component', () => {
  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "You have been logged out" text when request is success', async () => {
      render(
        <TestQueryProvider>
          <LogoutButton />
          <Toaster />
        </TestQueryProvider>,
      );

      const logoutButton = screen.getByRole('button', {
        name: '',
      });
      await userEvent.click(logoutButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'You have been logged out',
      );
    });

    it('should render "Something went wrong. You have not been logged out" text when request is failed', async () => {
      server.use(
        rest.get(`${API_URL}/auth/logout`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <LogoutButton />
          <Toaster />
        </TestQueryProvider>,
      );

      const logoutButton = screen.getByRole('button', {
        name: '',
      });
      await userEvent.click(logoutButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong. You have not been logged out',
      );
    });

    it('should render "Logging out ..." text and disable button when request is loading', async () => {
      server.use(
        rest.get(`${API_URL}/auth/logout`, (req, res, ctx) => {
          return res(ctx.delay(300), ctx.status(200));
        }),
      );

      render(
        <TestQueryProvider>
          <LogoutButton />
          <Toaster />
        </TestQueryProvider>,
      );

      const logoutButton = screen.getByRole('button', {
        name: '',
      });
      await userEvent.click(logoutButton);

      expect(screen.getByRole('status')).toHaveTextContent('Logging out ...');
      expect(logoutButton).toBeDisabled();
    });
  });
});
