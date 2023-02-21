import { useSession } from "next-auth/react"

const Auth: React.FC<{children?: string | JSX.Element | JSX.Element[]}> = ({children}) => {
    const { status } = useSession()
    if(status === "loading") {
        return(
            <div>Loading state...</div>
        )
    }
    return (
        <>
            {children}
        </>
    )   
}

export default Auth