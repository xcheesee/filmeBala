import Image from "next/image"

const Footer: React.FC = () => {
    return (
        <div className="flex justify-center p-4 gap-2">
            <p className="flex gap-1">Made by<a href="https://github.com/xcheesee" className="flex gap-1">
                Lucas Silva <Image src="/github-mark-white.png" alt="" width={24} height={24}/>
            </a></p>
        </div>
    )
}

export default Footer