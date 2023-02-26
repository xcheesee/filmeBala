import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { CARD_IMAGE_SIZE, MAX_SLIDER_SIZE } from "../utils/constants";
import MovieCard from "./movieCard";

const MovieSlider: React.FC<MSliderProps> = ({name, path, }) => {
    const { isLoading, data } = useQuery([`${name}Data`], async () => await ( await fetch(path)).json())
    const [slider, dispatch] = useReducer(reducer, {count: 0})
    function getSliderResetCondition (dataSize:number , containerSize: number, cardSize: number): number {
        return dataSize - (containerSize / cardSize)
    }
    function reducer (state: {count: number}, action: {type: string}) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1}
            case 'decrement':
                return {count: state.count - 1}
            case 'start':
                return {count: 0}
            case 'end':
                return {count: data?.results?.length - 1}
            default:
                throw new Error();
        }
    }
    return(
        <div className="overflow-hidden relative bg-red-500">
            <p className="capitalize absolute z-50 pl-16" style={{transform: "translate(0, 100%)"}}>{name}</p>
            {isLoading
                ? ""
                :<>
                    <button 
                        className="absolute left-0 z-10 top-1/2 font-bold bg-[rgba(0,0,0,0.8)] p-2 rounded-[50%]" 
                        style={{transform: 'translate(0, -50%)'}}
                        onClick={() => {
                            if(slider.count > 0) return dispatch({type: 'decrement'})
                            return dispatch({type: 'end'})
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <button 
                        className="absolute right-0 z-10 top-1/2 font-bold bg-[rgba(0,0,0,0.8)] p-2 rounded-[50%]" 
                        style={{transform: 'translate(0, -50%)'}}
                        onClick={() => {
                            if(slider.count < getSliderResetCondition(data?.results?.length, MAX_SLIDER_SIZE, CARD_IMAGE_SIZE)) return dispatch({type: 'increment'})
                            return dispatch({type: 'start'})
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </>
            }
            <div className="h-screen grid grid-flow-col w-screen relative transition duration-500" style={{transform: `translateX(-${100 * slider.count}%)`}}>
                {isLoading
                    ? <div className="justify-self-center self-center">Loading...</div>
                    :
                    data?.results?.map((entry: MovieData, index: number) => 
                    <MovieCard 
                        key={`mCard-${index}`}
                        name={entry.original_title} 
                        description={entry.overview} 
                        playtime="2h" 
                        ratings={entry.vote_average} 
                        image={entry.backdrop_path}
                        id={entry.id} />)}
                {
                }

            </div>
        </div>
    )
}

interface MovieData {
    original_title: string,
    overview: string,
    vote_average: number,
    poster_path: string,
    backdrop_path: string,
    id: number
}

type MSliderProps = {
    name: string;
    path: string;
}

export default MovieSlider