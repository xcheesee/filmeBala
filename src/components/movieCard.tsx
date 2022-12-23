import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

const MovieCard: React.FC<McardProps> =  ({ name, playtime, description, ratings, id, image }) => {

    return (
        <div className="h-full w-[250px] bg-blue-200 relative flex overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w300${image}`} className='absolute'/>
            <div className="mt-auto relative w-full h-full translate-y-[80%] hover:translate-y-[0%] transition bg-neutral-800 relative rounded duration-1000 mCard grid grid-cols-3 grid-rows-[min-content_min-content_1fr_min-content]">
                <p className="col-span-3 text-xl">{name}</p>
                <p className="row-start-2 text-neutral-500">{playtime}</p>
                <p className="row-start-3 self-center col-span-3 text-sm overflow-auto">{description}</p>
                <p className="row-start-4">{ratings} <FontAwesomeIcon icon={faStar} /></p>
                <p className="row-start-5 col-span-3">Botao Ver / Botao Assistir Depois</p>

            </div>
        </div>
    )
}

type McardProps = {
    name: string;
    playtime: string;
    description: string;
    ratings: number;
    id: number;
    image: string;
}

export default MovieCard