import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:8080/invoice", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.patch("http://localhost:8080/invoice/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete("http://localhost:8080/invoice/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get("http://localhost:8080/auth/logout", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
