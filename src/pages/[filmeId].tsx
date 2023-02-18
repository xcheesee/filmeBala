import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
// import { moviesComms } from "../server/db/filmeTempDb"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faStar, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from "@tanstack/react-query";
import { CARD_IMAGE_SIZE } from "../utils/constants";
import { trpc } from "../utils/trpc";

const FilmePage: NextPage = () => {
    
    const router = useRouter()
    const filmeId = router.query.filmeId || 0
    const filme = trpc.filmes.getFilme.useQuery(+filmeId)

    return (
        <div className="grid md:grid-cols-[min(500px,100%)_1fr]  md:grid-rows-[1fr_min-content] justify-self-center py-20" style={{width: "min(1400px, 100%)"}}>
            {
                filme.isLoading 
                    ? <div>Carregando...</div>
                    :<>
                        <div className="">
                            <div className="h-full lg:p-8" style={{width: "min(500px, 100%)"}}>
                                <img src={`https://image.tmdb.org/t/p/w500${filme?.data?.posterPath}`}
                                    alt="Movie banner" 
                                    className="object-cover"
                                    />
                            </div>
                        </div>
                        <div className="flex flex-col gap-16 py-4 mt-8">
                            <div className="font-light text-7xl tracking-wider">
                                {filme?.data?.title}
                            </div>
                            <div className="max-w-[70ch]">
                                {filme?.data?.overview}
                            </div>
                            <div className="flex gap-8">
                                <div className="flex gap-2">
                                    <p className="font-bold color-neutral-500">Avaliacao IMDb:</p>
                                    {`${filme?.data?.ratings?.toFixed(1)}/10`}
                                </div>
                                {/* <div className="flex gap-2">
                                    <p className="font-bold color-neutral-500">Avaliacao Filmin:</p>
                                    {`${filmeDb[+filmeId!]?.rtRating}/10`}
                                </div> */}
            
                            </div>
                            <div className="flex justify-between w-[min(70ch,100%)] mt-auto pb-4 pr-4">
                                <span className="text-yellow-500">
                                    <FontAwesomeIcon icon={faStar} size="3x"/>
                                </span>
                                <div className="flex gap-4">
                                    <span className="text-blue-500">
                                        <FontAwesomeIcon icon={faThumbsUp} size="3x"/>
                                    </span>
                                    <span className="text-red-500 relative top-3">
                                        <FontAwesomeIcon icon={faThumbsDown} size="3x"/>
                                    </span>
            
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 justify-self-center md:w-[720px] w-full">
                            <div className="grid gap-4 p-4 my-4 bg-neutral-800 rounded shadow-[inset_-1px_1px_6px_#404040,-1px_1px_6px_#171717]">
                                {/* {moviesComms[+filmeId!]?.length != 0 ? moviesComms[+filmeId!]?.map((entry) => {
                                    return(
                                        <div className="grid grid-cols-[min-content_1fr] gap-x-4">
                                            <div className="row-span-2 flex self-center h-[24px] w-[24px]">
                                                <Image src="/user-64.png" alt="User Photo" width={24} height={24}/>
                                            </div>
                                            <div className="font-bold">
                                                {entry.author}
                                            </div>
                                            <div>{entry.text}</div>
                                        </div>
                                    )
                                }) : <div> nenhum comentario a mostrar </div>} */}
                                <textarea rows={4} name="comentario" placeholder="Deixe seu comentario" className="bg-neutral-700 rounded px-4 py-2"/>
                                <button className="bg-stone-900 rounded py-2 px-4">Enviar</button>
                            </div>
                        </div>
                    </>           
            }

        </div>
    )
}

export default FilmePage