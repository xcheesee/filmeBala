import { type NextPage } from "next";
import Image from "next/image";
import MovieSlider from "../components/movieSlider";
import { env } from "../env/client.mjs";

const Home: NextPage = () => {

    return(
        <>
            <div className="max-w-[100vw] relative overflow-hidden" style={{height: "calc(100vh - 56px)"}}>
                <div className="absolute z-10 h-full w-full bg-[rgba(0,0,0,0.85)] flex flex-col justify-center items-center gap-4">
                    <p className="text-7xl tracking-widest font-light  py-8">SO FILME BALA</p>
                    <p className="text-3xl">De Mafioso, De Guerra, De Luta, De Tiro, etc. so os bom mlk.</p>
                    <p className="text-3xl">Vem de arrasta pra cima que eh sucesso, tudo gratis.</p>
                </div>
                <div className={`min-h-full flex relative  infiniteScroll`}>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center relative overflow-hidden justify-self-center">
                <MovieSlider
                    name='populares' 
                    path='http://localhost:3000/api/movies/populares'/>
            </div>
            <div className="flex justify-center relative overflow-hidden justify-self-center">
            <MovieSlider 
                name='acao' 
                path='http://localhost:3000/api/movies/populares?genre=28'/>
            </div>
            <div className="flex justify-center relative overflow-hidden justify-self-center">
            <MovieSlider
                name='comedia'
                path='http://localhost:3000/api/movies/populares?genre=35' />
            </div>
        </>
    )
}

export default Home