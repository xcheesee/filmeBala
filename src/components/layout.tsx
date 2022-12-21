import React, { ReactElement } from "react"
import Footer from "./footer"
import Header from "./header"



const Layout: React.FC<{children: ReactElement}> =  ({ children }) => {
    return (
        <div className="min-h-screen grid grid-rows-[min-content_1fr_min-content] bg-gradient-to-tr from-stone-900 via-zinc-800 to-stone-800">
            <Header/>
                { children }
            <Footer/>
        </div>
    )
}

export default Layout