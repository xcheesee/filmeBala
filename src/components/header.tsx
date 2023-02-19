import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { GRADIENT_COLOR } from "../utils/constants"

const Header: React.FC = () => {
    const session = useSession()
    return (
        <div className="flex justify-between pl-4 pr-8 py-4 max-w-[100vw] shadow-lg fixed min-w-full z-30 bg-neutral-800">
            <Link href={"/"}>
                <h1 
                    className="font-bold text-3xl" 
                    style={{
                        backgroundImage: GRADIENT_COLOR,
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>Filmin</h1>
            </Link>
            <ul className="list-none flex gap-4">
                { session.status === "authenticated"
                    ?<>
                        <li>{session.data.user?.name}</li>
                        <Link href={"/api/auth/signout"}>
                            <li>Log out</li>    
                        </Link>
                    </>
                    :<>
                        <Link href={"/sign-up"}>
                            <li>Login</li>
                        </Link>
                        <Link href={"/sign-up"}>
                            <li>Sign in</li>
                        </Link>
                    </>
                }
            </ul>
        </div>
    )
}

export default Header