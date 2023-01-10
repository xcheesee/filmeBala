import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import MovieCard from "../components/movieCard";
import { CARD_IMAGE_SIZE } from "../utils/constants";

const Home: NextPage = () => {

    const { isLoading, error, data } = useQuery(['popData'], async () => await ( await fetch('https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')).json())
    const [slideCount, setSlideCount] = useState(0)
    console.log(data)

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
            <div className="py-8 lg:px-4 relative overflow-hidden">
                <p>Populares</p>
                <div className="absolute left-5 z-10 top-1/2 font-bold">back</div>
                <div className="absolute right-5 z-10 top-1/2 font-bold">foward</div>
                <div className="h-[300px] gap-5 flex py-2 transition duration-500 relative flex-none" style={{transform: `translateX(-${(CARD_IMAGE_SIZE + 20) * 4}px)`}}>
                    {data?.results?.map((entry: any) => 
                    <MovieCard 
                        name={entry.original_title} 
                        description={entry.overview} 
                        playtime="2h" 
                        ratings={entry.vote_average} 
                        image={entry.poster_path}
                        id={entry.id} />)}

                </div>
            </div>
            <div className="py-8 lg:px-4">
                <p>Tiro</p>
                <div className="w-full h-[300px] gap-4 flex py-2">
                </div>
            </div>
            <div className="py-8 lg:px-4">
                <p>Guerra</p>
                <div className="w-full h-[300px] gap-4 flex py-2">
                    {/* <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard /> */}
                </div>
            </div>
        </>
    )
}

export default Home