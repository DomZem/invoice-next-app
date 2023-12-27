import { rest } from "msw";

export const handlers = [
  rest.patch("http://localhost:8080/invoice/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
