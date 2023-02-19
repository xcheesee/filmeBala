import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const StarRating: React.FC = () => {
    const router = useRouter()
    const session = useSession()
    const utils = trpc.useContext()
    const filmeId: number | null = +router?.query?.filmeId || null
    const sessionId: number | null = +session?.data?.user?.id || null
    const ratingMutation = trpc.filme.sendRating.useMutation({onSuccess: (res) => {
        utils.filme.getRating.invalidate()
        setStarCount(res.rating)
    }})
    const ratingQuery = trpc.filme.getRating.useQuery({authorId: sessionId, movieId: filmeId})
    const [starCount, setStarCount] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        setStarCount(ratingQuery.data?.rating || 0)
    },[ratingQuery.isLoading])

    if(ratingQuery.isFetching) {
        return(
            <div>Loading...</div>
        )
    } else {

        return(
            <div className="relative">
                {session.status === "unauthenticated" 
                    ?<div className="w-full h-full absolute z-90"
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    >
                        <div 
                            className={`absolute ${isHovering? "block" : "hidden"} py-2 px-4 rounded-xl`} 
                            style={{transformOrigin: "top 10px", transform: "translate(0, -150%)", background: "rgba(0, 0, 0, 0.5)"}}
                            
                        >
                            Voce precisa estar logado para avaliar este filme!
                        </div>
                    </div>
                    : <div></div>
                }
                {[...Array(10)].map((el, index) => {
                    return (
                        <span className={index >= starCount ? "text-white" : "text-yellow-500"}> 
                            <FontAwesomeIcon 
                                icon={faStar} 
                                size="2x" 
                                onMouseOver={() => {
                                    setStarCount(index + 1)
                                }}
                                onMouseLeave={() => {
                                    setStarCount(ratingQuery.data?.rating || 0)
                                }}
                                onClick={async () => {
                                    if(!session.data?.user?.id || !router.query.filmeId) return
                                    ratingMutation.mutate({
                                        authorId: +session.data?.user?.id,
                                        movieId: +router.query.filmeId || 0,
                                        rating: index + 1
                                    })
                                    setStarCount(index + 1)
                                }}
                            />
                        </span>
                    )
                })}
            </div>
        )
    }

}

export default StarRating