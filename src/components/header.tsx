import { GRADIENT_COLOR } from "../utils/constants"

const Header: React.FC = () => {
    return (
        <div className="flex justify-between pl-4 pr-8 py-4 max-w-[100vw] shadow-lg">
            <h1 
                className="font-bold text-3xl" 
                style={{
                    backgroundImage: GRADIENT_COLOR,
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}>Filmin</h1>
            <ul className="list-none flex gap-4">
                <li>Login</li>
                <li>Signin</li>
            </ul>
        </div>
    )
}

export default Header