import { GRADIENT_COLOR_TOP_BOTTOM } from "../utils/constants"

const SidebarElement: React.FC<{
    children: JSX.Element[] | JSX.Element | string,
    tabValue: number,
    setTab: (value: number) => void 
}> = ({children, tabValue, setTab}) => {
    return(
        <div className="mr-8">
            <div className="border-red-500 -right-10 relative rounded-r" style={{background: GRADIENT_COLOR_TOP_BOTTOM}}>
                    <div 
                        className="bg-neutral-900 relative right-2 py-2 cursor-pointer"
                        onClick={() => setTab(tabValue)}
                    >
                        {children}
                    </div>
            </div>
        </div>
    )
}

export default SidebarElement