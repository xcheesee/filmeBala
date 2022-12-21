import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const addToDB = async (req: NextApiRequest, res: NextApiResponse) => {
    const added = await prisma.example.create({data: {
    }})
    res.status(200).send("adicionado")
}

export default addToDB