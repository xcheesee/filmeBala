import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { GRADIENT_COLOR } from "../utils/constants"
import Button from "./button"

const Header: React.FC = () => {
    const session = useSession()
    const router = useRouter()
    return (
        <div className="flex justify-between pl-4 pr-8 py-4 max-w-[100vw] shadow-lg fixed min-w-full z-30 bg-neutral-800 ">
            <Link href={"/"}>
                <h1 className="font-bold text-3xl gradient_text"> Filmin </h1>
            </Link>
            <ul className="list-none flex gap-8 items-center justify-content-center">
                { session.status === "authenticated"
                    ?<>
                        <Link href={"/profile"}>
                            <li className="font-bold text-lg gradient_text"> {session.data.user?.name} </li>
                        </Link>
                        <Link href={"/api/auth/signout"}>
                            <li>Log out</li>    
                        </Link>
                    </>
                    :<>
                        <Button
                            onClick={() => {
                                router.push('/sign-up')
                            }}
                        >
                            Sign in
                        </Button>
                        <Link href={"/sign-up"}>
                            <p className="text-neutral-400 font-semibold">Login</p>
                        </Link>
                    </>
                }
            </ul>
        </div>
    )
}

export default Header