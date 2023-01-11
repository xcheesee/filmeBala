import { type NextApiRequest, type NextApiResponse } from "next";
import Cors from "cors"

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
    origin: '*'
})

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
}

const addToDB = async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors)
    const data = await (await fetch('https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&with_genres=35&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')).json()
    res.status(200).send(data)
}

export default addToDB