import { type NextPage } from "next";
import Image from "next/image";
import MovieSlider from "../components/movieSlider";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const Home: NextPage = () => {
    const searchValue = useRef<HTMLInputElement>(null)
    const searchResult = useMutation({
        mutationFn: async (movieString: string) => await (await fetch(`http://localhost:3000/api/movies/find?movie=${movieString}`)).json()
    })
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
                        searchResult.mutate(query)
                        console.log(await searchResult.data)
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color={"#666666"} className="relative" style={{transform: "translateX(-150%)"}}/>
                    </button>
                </div>
                <div className="self-center justify-self-center py-16">
                    <p className="text-center text-5xl font-bold">Nao achou o que assistir?</p>
                    <p className="py-4 text-3xl w-[40ch] text-center">Use a barra de pesquisa acima e ache a melhor forma de desperdicar 2h de sua vida</p>
                </div>
            </div>
        </>
    )
}

export default Home