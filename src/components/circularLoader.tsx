const CircularLoader: React.FC<CircularLoaderProps> = ({color}) => {
    return (
        <div className="w-[20px] h-[20px] m-auto">
            <svg className="circular-loader" viewBox="25 25 50 50">
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none" style={{stroke: `${color || "black"}`}}></circle>
            </svg>
        </div>
    )
}

interface CircularLoaderProps {
    color?: string
}

export default CircularLoader