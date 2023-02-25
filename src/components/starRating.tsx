import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import CircularLoader from "./circularLoader";

const StarRating: React.FC = () => {
    const router = useRouter()
    const session = useSession()
    const [starCount, setStarCount] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const filmeId: number | null = router?.query?.filmeId === undefined ? null : +router?.query?.filmeId
    const sessionId: number | null = session?.data?.user?.id === undefined ? null : +session?.data?.user?.id
    const ratingMutation = trpc.filme.sendRating.useMutation({onSuccess: (res) => {
        ratingQuery.refetch()
        setStarCount(res.rating)
    }})
    const ratingQuery = trpc.filme.getRating.useQuery({authorId: sessionId, movieId: filmeId}, {
        onSuccess: (res) => {
            setStarCount(res?.rating || 0)
        }
    })

    if(ratingQuery.isLoading || ratingMutation.isLoading) {
        return(
            <div className="self-center"><CircularLoader color="white"/></div>
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
                            className={`absolute ${isHovering? "block" : "hidden"} py-2 px-4 rounded-xl z-30`} 
                            style={{transformOrigin: "top 10px", transform: "translate(0, -150%)", background: "rgba(0, 0, 0, 0.5)"}}
                            
                        >
                            Voce precisa estar logado para avaliar este filme!
                        </div>
                    </div>
                    : <div></div>
                }
                {[...Array(10)].map((el, index) => {
                    return (
                        <span className={index >= starCount ? "text-white" : "text-yellow-500"} key={`star-${index}`}> 
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