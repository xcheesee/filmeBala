const Input: React.FC<InputProps> = ({label, type, id, name, required, className, defaultValue="", disabled=false, error}) => {
    return(
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={id} className="-ml-2">
                {label}{required ? " * " : ""}
            </label>
            <input 
                id={id || ""} 
                name={name || ""} 
                type={type || ""} 
                defaultValue={`${defaultValue}`}
                className={`text-black px-2 py-1 rounded ${error?.triggered ? "border-red-500 border-2" : ""}`}
                required={required || false}
                disabled={disabled}
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
                />
            <p className="text-red-500">{error?.triggered ? `${error.message}`  : ""}</p>
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
    defaultValue?: string | number | null;
    disabled?: boolean
    error?: {
        message: string;
        triggered: boolean;
    }
}

export default Input