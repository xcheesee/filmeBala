import { type NextApiResponse, type NextApiRequest } from "next";
import { env } from "../../../env/server.mjs";

const find = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { movie, page = 1 } = req.query
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env.TMDB_API_KEY}&language=en-US&query=${movie}&page=${page}&include_adult=false`, {
        mode: "cors"
    })
    const json = await data.json()
    res.send(json)
}

export default find