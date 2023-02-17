import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs"

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  signUp: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string(),
      name: z.string(),
      surname: z.string(),
      age: z.number(),
    }))
    .query( async ({ input, ctx }) => {
      const { username, password, name, surname, age } = input
      const salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(password, salt);

      const res = await ctx.prisma.mdbUser.create({
        data: {
          username: username,
          pwHash: hash,
          name: name,
          surname: surname,
          age: age,
        }
      })
    })
});
