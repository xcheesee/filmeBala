const TabElement: React.FC<{
    children?: JSX.Element[] | JSX.Element | string, 
    selected: number, 
    index: number,
    tabHeader: string,
}> = ({ children, selected, index, tabHeader }) => {
    return(
        <div className={`md:w-3/4 w-full h-4/6 rounded ${selected === index ? "" : "hidden"}`}>
            <h1 className="text-3xl font-bold max-md:text-center">{tabHeader}</h1>
            <div className="w-full h-full flex flex-col bg-neutral-900 mt-4 rounded-xl overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}

export default TabElement