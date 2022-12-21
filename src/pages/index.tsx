import { type NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
    return(
        <div className="min-w-screen relative transition duration-1000 -translate-x-full overflow-hidden">
            <Image src='/wp1945898.jpg' fill alt="" />
            <Image src='/wp1945898.jpg' fill alt="" />
            <Image src='/wp1945898.jpg' fill alt="" />
        </div>
    )
}

export default Home