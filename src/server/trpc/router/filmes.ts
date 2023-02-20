import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { publicProcedure, router } from "../trpc";

export const filmesRouter = router({
    getFilme: publicProcedure
        .input(z.number())
        .query(async ({ input, ctx }) => {
            const filme = await ctx.prisma.movie.findUnique({
                where: {
                    id: input
                },
                include: {
                    nativeRatings: true,
                    _count: {
                        select: {
                            nativeRatings: true,
                        }
                    },
                    userToWatch: true
                }
            })
            if (filme !== null) {
                return filme
            } else {
                const filmeData = await fetch(`https://api.themoviedb.org/3/movie/${input}?api_key=${env.TMDB_API_KEY}&language=en-US`)
                const json = await filmeData.json()
                return await ctx.prisma.movie.create({
                    data: {
                        id: json.id,
                        title: json.original_title,
                        overview: json.overview,
                        tagline: json.tagline,
                        releaseDate: json.release_date,
                        runtime: json.runtime,
                        ratings: json.vote_average,
                        Status: json.status,
                        posterPath: json.poster_path,
                    }, 
                    include: {
                        nativeRatings: true,
                        _count: {
                            select: {
                                nativeRatings: true,
                            }
                        },
                        userToWatch: true
                    }
                })
            }
        })
})