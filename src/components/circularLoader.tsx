const CircularLoader: React.FC = () => {
    return (
        <div className="w-[20px] h-[20px] m-auto">
            <svg className="circular-loader" viewBox="25 25 50 50">
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )
}

export default CircularLoader