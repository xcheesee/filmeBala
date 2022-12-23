import Image from "next/image"

const Footer: React.FC = () => {
    return (
        <div className="max-w-[100vw]">
            <div className="flex justify-center  p-4 gap-2">
                <div className="flex gap-1">Made by<a href="https://github.com/xcheesee" className="flex gap-1">
                    <p>Lucas Silva</p> <Image src="/github-mark-white.png" alt="" width={24} height={24}/>
                </a>
            
                </div>
            </div>
            <div className="flex justify-center  p-4 gap-2">
                <div className="flex gap-1">Powered by<a href="https://www.themoviedb.org/" className="flex gap-1">
                    <Image src="/tmdb.svg" alt="" width={124} height={24}/>
                </a>
            
                </div>
            </div>
        </div>
    )
}

export default Footer