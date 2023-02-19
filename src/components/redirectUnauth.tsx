import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const RedirectUnauth: React.FC<{children?:  string | JSX.Element | JSX.Element[]}> = ({children}): JSX.Element | null => {
    const session = useSession()
    const router = useRouter()
    if(session.status === "unauthenticated") {
        router.push('/sign-up')
        return null
    }
    return(
        <>
            { children }
        </>
    )
}

export default RedirectUnauth