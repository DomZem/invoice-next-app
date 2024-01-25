import LoginForm from '@/components/LoginForm';
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
      push: jest.fn(),
    };
  },
}));

describe('LoginForm', () => {
  describe('Unit', () => {
    it('should render "Invalid email" text when email input value does not contain "@" special character', async () => {
      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      const emailInput = screen.getByLabelText('address email');
      await userEvent.type(emailInput, 'anakin.skywalker.gmail.com');

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('should render "Required" text when password input value is lesser than 1 character', async () => {
      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('should render "Processing" text inside submit button and disable it when request is loading', async () => {
      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.delay(200));
        }),
      );

      render(
        <TestQueryProvider>
          <LoginForm />
        </TestQueryProvider>,
      );

      // type correct data into form
      const emailInput = screen.getByLabelText('address email');
      await userEvent.type(emailInput, 'anakin.skywalker@gmail.com');

      const passwordInput = screen.getByLabelText('password');
      await userEvent.type(passwordInput, 'zaq1@WSX');

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Processing ...');
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Something went wrong. You have not been logged in" text when request is failed', async () => {
      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <LoginForm />
          <Toaster />
        </TestQueryProvider>,
      );

      // type correct data into form
      const emailInput = screen.getByLabelText('address email');
      await userEvent.type(emailInput, 'anakin.skywalker@gmail.com');

      const passwordInput = screen.getByLabelText('password');
      await userEvent.type(passwordInput, 'zaq1@WSX');

      const submitButton = screen.getByRole('button', {
        name: /Submit/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Something went wrong. You have not been logged in',
      );
    });
  });
});
