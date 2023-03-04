import { type NextPage } from "next";
import Image from "next/image";
import MovieSlider, { MovieData } from "../components/movieSlider";
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FindMCard from "../components/findMCard";
import CircularLoader from "../components/circularLoader";
import Pagination from "../components/pagination";


const Home: NextPage = () => {
    const searchValue = useRef<HTMLInputElement>(null)
    const searchResult = useMutation({
        mutationFn: async (movieString: {query: string, page: number}) => await (await fetch(`http://localhost:3000/api/movies/find?movie=${movieString.query}&page=${movieString.page}`)).json()
    })
    const [selectedPage, setSelectedPage] = useState(1)
    return(
        <>
            <div className="relative" style={{height: "100vh"}}>
                <div className="absolute z-10 h-screen w-full bg-[rgba(0,0,0,0.85)] flex flex-col justify-center items-center gap-4">
                    <p className="text-7xl tracking-widest font-light  py-8">SO FILME BALA</p>
                    <p className="text-3xl">Commodo sint eu quis nostrud commodo sit ut deserunt culpa quis proident sunt eu minim.</p>
                    <p className="text-3xl">Anim aliquip labore ad mollit voluptate.</p>
                </div>
                <div className="h-full min-w-full flex infiniteScroll fixed top-0">
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                </div>
            </div>
            <div className="z-20 pb-20" style={{background: "inherit"}}>
                <MovieSlider
                    className="mb-60 mt-8"
                    name='populares' 
                    path='https://filme-bala.vercel.app/api/movies/populares'/>
                <MovieSlider 
                    className="mb-60"
                    name='acao' 
                    path='https://filme-bala.vercel.app/api/movies/populares?genre=28'/>
                <MovieSlider
                    name='comedia'
                    path='https://filme-bala.vercel.app/api/movies/populares?genre=35' />
            </div>
            <div className="z-50 flex py-4 justify-center flex-col gap-4" style={{background: "inherit"}}>
                <div className="relative self-center">
                    <input 
                        type="text" 
                        name="search_value" 
                        id="search_value" 
                        placeholder="As Tranças do Rei Careca" 
                        className="rounded text-black px-2 py-1"
                        ref={searchValue}
                        
                    />
                    <button onClick={async () => {
                        if(!searchValue.current?.value) return
                        const query = searchValue.current.value
                        searchResult.mutate({query, page: 1})
                        console.log(await searchResult.data)
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color={"#666666"} className="relative" style={{transform: "translateX(-150%)"}}/>
                    </button>
                </div>
                <div className="flex flex-col self-center justify-self-center py-16 w-full xl:w-[1260px]">
                    {searchResult.isLoading
                        ? <div className="flex">
                            <CircularLoader color="white" width={50} height={50} />
                        </div>
                        :searchResult.data === undefined
                            ?<>
                                <p className="text-center text-5xl font-bold">Nao achou o que assistir?</p>
                                <p className="py-4 text-3xl max-w-[40ch] self-center text-center">Use a barra de pesquisa acima e ache a melhor forma de desperdicar 2h de sua vida</p>
                            </>
                            :searchResult?.data?.results?.map((entry: MovieData, index: number) => {
                                return (
                                
                                <FindMCard 
                                    key={`search-${index}`} 
                                    name={entry.original_title} 
                                    description={entry.overview} 
                                    ratings={entry.vote_average} 
                                    id={entry.id}
                                    image={entry.poster_path}
                                />
                            )})
                    }
                    <div className={`flex justify-center py-2 px-4 ${searchResult.isLoading || searchResult.data === undefined ? "hidden" : ""}`}>
                        <Pagination 
                            pages={searchResult?.data?.total_pages || 1}
                            clickEv={(pag: number) => {
                                if(!searchValue.current?.value) return
                                const query = searchValue.current.value
                                return searchResult.mutate({query: query, page: pag})
                            }}
                        />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Home