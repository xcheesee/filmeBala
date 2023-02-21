import { type NextApiResponse, type NextApiRequest } from "next";
import { env } from "../../../env/server.mjs";

const movie = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const { id } = req.query
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${env.TMDB_API_KEY}&language=en-US`, {
        mode: "cors"
    })
    const json = await data.json()
    res.send(json)
}

export default movie