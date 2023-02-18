import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs"
import { TRPCError } from "@trpc/server";

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
    .mutation( async ({ input, ctx }) => {
      const { username, password, name, surname, age } = input
      return await new Promise((res, rej) => {
        setTimeout(() => res('pog'), 50000)
      })
      const userCheck = await ctx.prisma.mdbUser.findUnique({
        where: {
          username: username
        }
      })
      if(userCheck !== null) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Usuario Ja existente na base!'
        })
      }
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
    }),
  login: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string(),
    }))
    .mutation( async ({ ctx, input}) => {
      const { username, password } = input
      const userData = await ctx.prisma.mdbUser.findUnique({
        where: {
          username: username
        }
      })
      if(userData === null) throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuario nao encontrado!"
      })
      const isValid = bcrypt.compareSync(password, userData.pwHash)
      if(isValid) return isValid
      else throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Senha Incorreta"
      })
    })
});
