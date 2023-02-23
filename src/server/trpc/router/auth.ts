import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs"
import { TRPCError } from "@trpc/server";
import { IMPORTANT_VALIDATION1, IMPORTANT_VALIDATION2 } from "../../../utils/constants";

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
      const normalizedPw = password.toLowerCase()
      if(normalizedPw.search("13") !== -1) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Petista Safado"
        })
      }
      if(normalizedPw.search("2007") === -1) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Dica: O corinthians caiu no ano do porco segundo calendario chinês"
        })
      }
      let isValidPw = false
      isValidPw = IMPORTANT_VALIDATION1.findIndex(el => password.includes(el)) !== -1
      if(!isValidPw) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "o Endrick ta voando mlk"
        })
      }
      isValidPw = IMPORTANT_VALIDATION2.findIndex(el => password.includes(el)) !== -1
      if(!isValidPw) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Ganhei 50tao no galo esses dias"
        })
      }
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
      const hash = bcrypt.hashSync(password, salt);
      // return "pog"
      await ctx.prisma.mdbUser.create({
        data: {
          username: username,
          pwHash: hash,
          name: name,
          surname: surname,
          age: age,
        }
      })
      return
    }),
});
