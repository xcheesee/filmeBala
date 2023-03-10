import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";

const getPopular = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { genre } = req.query
    const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&with_genres=${genre}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, {
        mode: "cors"
    })
    const json = await data.json()
    res.send(json)
}

export default getPopular