import React from "react"

const Dialog: React.FC<{open: boolean, children?: string | JSX.Element | JSX.Element[]}> = ({ open, children }) => {
    return(
        <div className={`absolute bg-black bg-opacity-80 w-screen h-screen grid grid-cols-1 items-center justify-items-center ${open ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-3xl grid grid-rows-[max-content_1fr_max-content] grid-cols-1 gap-2 py-4 px-8">
                {children}
            </div>
        </div>
    )
}

export default Dialog