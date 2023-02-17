import { type NextApiResponse, type NextApiRequest,  } from "next";
import { prisma } from "../../server/db/client";
import bcrypt from "bcryptjs"

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, name, surname, age } = req.body
    bcrypt.hash(password, 10, async (err, hashedPw) => {
        return await prisma.mdbUser.create({
            username: username,
            pwHash: hashedPw,
            name: name,
            surname: surname,
            age: age,

        })
    })
}