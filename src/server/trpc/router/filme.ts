import { number, z } from "zod";
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
        }),
    sendRating: protectedProcedure
        .input(z.object({
            movieId: z.number(),
            authorId: z.number(),
            rating: z.number()
        }))
        .mutation(async ({ctx, input}) => {

            // const res = await ctx.prisma.movieRating.findMany({
            //     where: {
            //          authorId: input.authorId,
            //          movieId: input.movieId
            //     }
            // })
            // if(res === null) {
            //     return await ctx.prisma.movieRating.create({
            //         data: {
            //             authorId: input.authorId,
            //             movieId: input.movieId,
            //             rating: input.rating,
            //         }
            //     })
            // }
            return await ctx.prisma.movieRating.upsert({
                where: {
                    authorId_movieId: {
                        movieId: input.movieId,
                        authorId: input.authorId,
                    }
                },
                create: {
                    authorId: input.authorId,
                    movieId: input.movieId,
                    rating: input.rating,
                },
                update: {
                    rating: input.rating
                },
            })
        }),
    getRating: publicProcedure
        .input(z.object({
            authorId: z.number().nullish(),
            movieId: z.number().nullish(),
        }))
        .query(({ctx, input}) => {
            if(!input.authorId || !input.movieId) return null
            return ctx.prisma.movieRating.findUnique({
                where: {
                    authorId_movieId: {
                        authorId: input.authorId,
                        movieId: input.movieId,
                    }
                }
            })
        })

})