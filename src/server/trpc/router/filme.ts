import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const filmeRouter = router({
    getComms: publicProcedure
    .input(z.string())
    .query(async ({input , ctx}) => {
        return await ctx.prisma.comment.findMany({
            where: {
                movieId: +input
            },
            include: {
                CommAuthor: true
            }
        })
    }),
    sendComm: protectedProcedure
        .input(z.object({
            movieId: z.number(),
            authorId: z.number(),
            comment: z.string()
        }))
        .mutation(async ({ctx, input}) => {
            const comm = await ctx.prisma.comment.create({
                data: {
                    authorId: input.authorId,
                    movieId: input.movieId,
                    comment: input.comment,
                }
            })
            return "Comentario criado com sucesso!"
        })
})