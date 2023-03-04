import CircularLoader from "./circularLoader"

const PageSpinner: React.FC = () => {
    return(
        <div className="flex absolute top-0 w-full h-full z-50" style={{ background: "rgba(0, 0, 0, 0.6)"}}>
            <div className="self-center mx-auto">
                <CircularLoader color="white" width={100} height={100}  />
            </div>
        </div>
    )
}

export default PageSpinner