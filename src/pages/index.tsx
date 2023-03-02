import { type NextPage } from "next";
import Image from "next/image";
import MovieSlider from "../components/movieSlider";

const Home: NextPage = () => {

    return(
        <>
            <div className="relative" style={{height: "100vh"}}>
                <div className="absolute z-10 h-screen w-full bg-[rgba(0,0,0,0.85)] flex flex-col justify-center items-center gap-4">
                    <p className="text-7xl tracking-widest font-light  py-8">SO FILME BALA</p>
                    <p className="text-3xl">De Mafioso, De Guerra, De Luta, De Tiro, etc. so os bom mlk.</p>
                    <p className="text-3xl">Vem de arrasta pra cima que eh sucesso, tudo gratis.</p>
                </div>
                <div className="h-full min-w-full flex infiniteScroll fixed">
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                </div>
            </div>
            <div className="z-20 pb-20" style={{background: "inherit"}}>
                {/* <div className="flex justify-center relative justify-self-center"> */}
                    <MovieSlider
                        name='populares' 
                        path='https://filme-bala.vercel.app/api/movies/populares'/>
                {/* </div> */}
                {/* <div className="flex justify-center relative justify-self-center"> */}
                    <MovieSlider 
                        name='acao' 
                        path='https://filme-bala.vercel.app/api/movies/populares?genre=28'/>
                {/* </div> */}
                {/* <div className="flex justify-center relative justify-self-center"> */}
                    <MovieSlider
                        name='comedia'
                        path='https://filme-bala.vercel.app/api/movies/populares?genre=35' />
                {/* </div> */}

            </div>
        </>
    )
}

export default Home