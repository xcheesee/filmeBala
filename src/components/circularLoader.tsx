const CircularLoader: React.FC<CircularLoaderProps> = ({color, width=20, height=20}) => {
    return (
        <div className=" m-auto" style={{width: `${width}px`, height: `${height}px`}}>
            <svg className="circular-loader" viewBox="25 25 50 50">
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none" style={{stroke: `${color || "black"}`}}></circle>
            </svg>
        </div>
    )
}

interface CircularLoaderProps {
    color?: string
    width?: number
    height?: number
}

export default CircularLoader