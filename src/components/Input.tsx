const Input: React.FC<InputProps> = ({label, type, id, name, required, className}) => {
    return(
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor="password" className="-ml-2">
                {label}
            </label>
            <input 
                id={id || ""} 
                name={name || ""} 
                type={type || ""} 
                className={`text-black px-2 py-1 rounded`}
                required={required || false}
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
                />
        </div>
    )
}

type InputProps = {
    label?: string;
    type?: string;
    id?: string;
    name?: string;
    required?: boolean;
    className?: string;
}

export default Input