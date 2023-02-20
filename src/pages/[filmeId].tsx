import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Button from "../components/button";
import StarRating from "../components/starRating";
import { useState } from "react";
import CircularLoader from "../components/circularLoader";

const FilmePage: NextPage = () => {
    
    const router = useRouter()
    const session = useSession()

    const [assistirDepoisFlag, setAssistirDepoisFlag] = useState(false)

    const filmeId = router.query.filmeId || 0
    const filme = trpc.filmes.getFilme.useQuery(+filmeId, {
        onSuccess: (res) => {
            if(res.userToWatch?.find(user => user.id === +session.data?.user?.id) !== undefined) 
                return setAssistirDepoisFlag(true)
        }
    })
    const comentarios = trpc.filme.getComms.useQuery(filmeId as string)
    const commMutation = trpc.filme.sendComm.useMutation({
        onSuccess: () => {
            comentarios.refetch()
        }
    })
    const watchLaterMutation = trpc.user.setWatchLater.useMutation({
        onSuccess: () => setAssistirDepoisFlag(true)
    })
    const cancelWatchLaterMutation = trpc.user.removeWatchLater.useMutation({
        onSuccess: () => setAssistirDepoisFlag(false)
    })
    const nativeRating = filme.data?.nativeRatings?.reduce((acc: number, val: NativeRating) => acc + val.rating, 0) / filme.data?._count.nativeRatings || 0

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
                                    <p className="font-bold color-neutral-500">Avaliacao TMDb:</p>
                                    {`${filme?.data?.ratings?.toFixed(1)}/10`}
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-bold color-neutral-500">Avaliacao Filmin:</p>
                                    {`${nativeRating.toFixed(1)}/10`}
                                </div>
            
                            </div>
                            <div className="grid grid-cols-[max-content_1fr] justify-items-center w-[min(70ch,100%)] mt-auto pb-4 pr-4">
                                <span className="text-yellow-500">
                                    <button 
                                        className={`${assistirDepoisFlag ? "bg-red-500" : "bg-blue-600"} py-2 px-4 rounded-lg`}
                                        onClick={async () => {
                                            if(!filme.data?.id || !session.data?.user?.id) return

                                            if(assistirDepoisFlag) 
                                                return cancelWatchLaterMutation.mutate({
                                                    movieId: +filmeId,
                                                    userId: +session.data?.user?.id,
                                                })
                                            
                                            return watchLaterMutation.mutate({
                                                movieId: +filmeId,
                                                userId: +session.data?.user?.id,
                                            })
                                        }}
                                        disabled={watchLaterMutation.isLoading || cancelWatchLaterMutation.isLoading}
                                        >
                                            <div className="flex text-white font-bold gap-2">
                                                {watchLaterMutation.isLoading || cancelWatchLaterMutation.isLoading
                                                    ? <CircularLoader />
                                                    : <div></div>}
                                                {assistirDepoisFlag ? "Remover Bookmark" :"Assistir mais tarde"}
                                            </div>
                                            </button>
                                </span>
                                <div className="flex">
                                    <StarRating />
                                </div>
                            </div>
                        </div>
                        <form   
                            className="md:col-span-2 justify-self-center md:w-[720px] w-full"
                            onSubmit={(e) => {
                                e.preventDefault()
                                const formData = Object.fromEntries(new FormData(e.currentTarget)) as unknown as ComentarioForm
                                if(formData.comentario?.length > 500) return
                                if(!filme.data?.id || !session.data?.user?.id) return
                                commMutation.mutate({
                                    authorId: +session.data.user.id,
                                    movieId: filme.data?.id,
                                    comment: formData.comentario,
                                })
                            }}
                        >
                            <div className="grid gap-4 p-4 my-4 bg-neutral-800 rounded shadow-[inset_-1px_1px_6px_#404040,-1px_1px_6px_#171717]">
                                {!comentarios.isLoading 
                                    ?comentarios.data?.map((entry: any, index: number) => {
                                        return(
                                            <div className="grid grid-cols-[min-content_1fr] gap-x-4" key={`comm-${filme.data?.id}-${index}`}>
                                                <div className="row-span-2 flex self-center h-[24px] w-[24px]">
                                                    <Image src="/user-64.png" alt="User Photo" width={24} height={24}/>
                                                </div>
                                                <div className="font-bold">
                                                    {entry?.CommAuthor?.username}
                                                </div>
                                                <div>{entry.comment}</div>
                                            </div>
                                        )
                                    }) 
                                    : <div className="text-center my-2"> nenhum comentario a exibir </div>
                                }

                                <textarea 
                                    rows={4} 
                                    name="comentario" 
                                    placeholder={session.status === "authenticated" ? "Deixe seu comentario" : "Voce precisa estar logado para comentar neste filme"} 
                                    disabled={session.status === "unauthenticated"}
                                    className={`${session.status !== "authenticated" ? "cursor-not-allowed" : ""} bg-neutral-700 rounded px-4 py-2`}
                                    />
                                <Button 
                                    disabled={session.status === "unauthenticated" || commMutation.isLoading}
                                    className={`${session.status === "unauthenticated" || commMutation.isLoading ? "cursor-not-allowed" : ""}`}
                                    >
                                    <div className="flex justify-center gap-4">
                                        {commMutation.isLoading
                                            ?<div className="self-center">
                                                <CircularLoader />
                                            </div>
                                            : <div></div>
                                        }
                                        <p className="text-neutral-700">Enviar</p>
                                    </div>
                                </Button>
                            </div>
                        </form>
                    </>           
            }

        </div>
    )
}

interface ComentarioForm {
    comentario: string
}

interface NativeRating {
    rating: number
}

export default FilmePage