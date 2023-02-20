import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
    setWatchLater: protectedProcedure
        .input(z.object({
            movieId: z.number().nullish(),
            userId: z.number().nullish()
        }))
        .mutation(async ({input, ctx}) => {
            if(!input.movieId || !input.userId) return null
            return await ctx.prisma.mdbUser.update({
                where: {
                    id: input.userId
                },
                data: {
                    watchLater: {
                        // set: [{id: input.movieId}],
                        connect: {id: input.movieId}
                    }
                },
            })
        }),
    removeWatchLater: protectedProcedure
        .input(z.object({
            movieId: z.number().nullish(),
            userId: z.number().nullish()
        }))
        .mutation(async ({input, ctx}) => {
            if(!input.movieId || !input.userId) return null
            return await ctx.prisma.mdbUser.update({
                where: {
                    id: input.userId
                },
                data: {
                    watchLater: {
                        disconnect: {id: input.movieId},
                    }
                },
            })
        }),
    getUser: publicProcedure
        .input(z.number().nullable())
        .query(async ({ input, ctx }) => {
            if(!input) return null
            const res = await ctx.prisma.mdbUser.findUnique({
                where: {
                    id: input
                },
                include: {
                    watchLater: true
                }
            })
            if(!res) return null
            return res
        }),
    editInfo: protectedProcedure
        .input(z.object({
            id: z.number().nullish(),
            username: z.string(),
            name: z.string(),
            surname: z.string(),
            age: z.number(),
        }))
        .mutation(async ({ input, ctx }) => {
            if(!input.id) return null
            return await ctx.prisma.mdbUser.update({
                where: {
                    id: input.id
                },
                data: {
                    username: input.username,
                    name: input.name,
                    surname: input.surname,
                    age: input.age
                }
            })
        })
})