import React from "react"
import { GRADIENT_COLOR } from "../utils/constants"

const Button: React.FC<ButtonProps> = ({ type, children, onClick, className, disabled}) => {
    return(
        <button 
            type={type}
            onClick={onClick}
            className={`bg-blue-600 rounded font-bold tracking-wider py-2 px-4 mt-4 text-neutral-700 ${className}`}
            style={{background: GRADIENT_COLOR}}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | JSX.Element | JSX.Element[]
}

export default Button