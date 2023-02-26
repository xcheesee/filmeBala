import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { CARD_IMAGE_SIZE } from '../utils/constants'
import Link from 'next/link'
import Image from 'next/image'

const MovieCard: React.FC<McardProps> =  ({ name, playtime, description, ratings, id, image }) => {
    return (
        <div className="h-full box-border relative relative overflow-hidden flex-none w-screen" >
            <div className='absolute h-screen w-screen'>
                <Image 
                    src={image} 
                    className='absolute'
                    alt="movie banner"
                    fill
                    loader={({src}) => `https://image.tmdb.org/t/p/original${src}`}
                />

            </div>
            <div className="mt-auto relative w-full h-full translate-y-[80%] 
            hover:translate-y-[0%] transition bg-neutral-800 relative rounded
            duration-1000 mCard grid grid-cols-3 grid-rows-[min-content_min-content_1fr_min-content]">
                <p className="col-span-3 text-xl">{name}</p>
                <p className="row-start-2 text-neutral-500">{playtime}</p>
                <div className='row-start-3 col-span-3 overflow-hidden overflow-y-auto my-4'>
                    <p className="h-full text-sm align-middle">{description}</p>
                </div>
                <p className="row-start-4">{ratings} <FontAwesomeIcon icon={faStar} /></p>
                <div className="row-start-5 col-span-3 flex justify-center py-2">
                    <Link href={`/${id}`}>
                        <button 
                            className='rounded bg-green-600 font-bold py-2 px-4 z-10'
                        >
                            Ver Pagina
                        </button>
                    </Link>
                </div>
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