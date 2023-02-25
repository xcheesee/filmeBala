const SkeletonElement: React.FC<{width: string, height: string}> = ({width, height}) => {
    return(
        <div
            style={{
                height: height,
                width: width,
            }}
            className="overflow-hidden relative flex rounded-xl"
        >
            <div className="flex skeleton_animation" style={{transform: "translateX(-60%)"}}>
                <div style={{background: "rgba(144,144,144,1)", width: width, height: height}}>

                </div>
                <div 
                    className="skeleton_gradient z-10"
                    style={{width: width, height: height}}
                >

                </div>
                <div className="w-full h-full" style={{background: "rgba(144,144,144,1)", width: width, height: height}}>

                </div>
            </div>
        </div>
    )
}

export default SkeletonElement