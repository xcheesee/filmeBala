import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "./button"
import { faStar} from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import { useRouter } from 'next/router'

const FindMCard: React.FC<FindMCardProps> = ({image, name, description, ratings, id}) => {
    const router = useRouter()
    return(
        <div className="bg-neutral-900 flex max-lg:flex-col w-full rounded my-2">
            <div className="relative w-[200px] h-[300px] border-4 max-lg:self-center border-black rounded-lg my-2 mx-2">
                {image === null
                    ?<Image 
                        src='/no-banner.png'
                        alt="movie banner"
                        fill
                    />
                    :<Image 
                    src={image}
                    alt="movie banner"
                    fill
                    loader={({src}) => `https://image.tmdb.org/t/p/w200${src}`}
                    />
                }
            </div>
            <div className="grid lg:grid-cols-[1fr_max-content] gap-4 w-full">
                <div className="row-span-2 mt-16">
                    <p className="font-bold text-3xl">{name}</p>  
                    <p className="my-4">{description}</p>
                </div>
                <div className=" justify-self-center max-lg:row-start-1 lg:justify-self-end mx-4 my-2 flex gap-4">
                    <div className=""><b>TMDb</b>: {ratings.toFixed(1)}/10 <FontAwesomeIcon icon={faStar} /></div>
                    <div className=""><b>Filmin</b>: TBD/10 <FontAwesomeIcon icon={faStar} /></div>
                </div>
                <Button 
                    className="lg:justify-self-end self-end my-2 mx-4"
                    onClick={() => {
                        router.push(`/${id}`)
                    }}
                >
                    Ver Pagina
                </Button>
            </div>
        </div>
    )
}

interface FindMCardProps {
    id: number;
    image: string;
    name: string;
    description: string;
    ratings: number;
}

export default FindMCard