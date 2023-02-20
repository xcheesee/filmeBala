import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

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
                        set: {id: input.movieId},

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
})