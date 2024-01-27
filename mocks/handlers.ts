import { API_URL } from '@/lib/axios';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${API_URL}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.put(`${API_URL}/invoice/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.patch(`${API_URL}/invoice/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${API_URL}/invoice/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
