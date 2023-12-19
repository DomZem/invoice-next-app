import { rest } from "msw";

export const handlers = [
  rest.patch("http://localhost:8080/invoice/1", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
