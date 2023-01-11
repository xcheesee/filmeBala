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
            <MovieSlider
                name='populares' 
                path={`https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`}/>
            <MovieSlider 
                name='acao' 
                path='https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&with_genres=28&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'/>
            <MovieSlider
                name='comedia'
                path='https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&with_genres=35&sort_by=popularity.desc&include_adult=false&include_video=false&page=1' />
        </>
    )
}

export default Home