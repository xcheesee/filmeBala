import { useSession } from "next-auth/react"
import { StyledJsxStyleRegistry } from "styled-jsx"

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