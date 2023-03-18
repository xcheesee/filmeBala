import { GRADIENT_COLOR_TOP_BOTTOM } from "../utils/constants"

const SidebarElement: React.FC<{
    children: JSX.Element[] | JSX.Element | string,
    tabValue: number,
    setTab: (value: number) => void,
    setDrawer: (value: boolean) => void
}> = ({children, tabValue, setTab, setDrawer}) => {
    return(
        <div className="mr-8">
            <div className={`border-red-500 md:-right-10 relative rounded-r sidebar max-md:text-center flex flex-col max-md:justify-between`} style={{background: GRADIENT_COLOR_TOP_BOTTOM}}>
                    <div 
                        className="bg-neutral-900 relative md:right-2 py-2 cursor-pointer"
                        onClick={() => {
                            setTab(tabValue)
                            setDrawer(false)
                        }}
                    >
                        {children}
                    </div>
            </div>
        </div>
    )
}

export default SidebarElement