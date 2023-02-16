import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { CARD_IMAGE_SIZE, MAX_SLIDER_SIZE } from "../utils/constants";
import MovieCard from "./movieCard";

const MovieSlider: React.FC<MSliderProps> = ({name, path}) => {
    const { isLoading, error, data } = useQuery([`${name}Data`], async () => await ( await fetch(path)).json())
    const [slider, dispatch] = useReducer(reducer, {count: 0})
    function getSliderResetCondition (dataSize:number , containerSize: number, cardSize: number): number {
        return dataSize - (containerSize / cardSize)
    }
    function reducer (state: any, action: any) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1}
            case 'decrement':
                return {count: state.count - 1}
            case 'start':
                return {count: 0}
            case 'end':
                return {count: data?.results?.length - 7}
            default:
                throw new Error();
        }
    }
    return(
        <div className="py-8 lg:px-4 overflow-hidden">
            <p className="capitalize">{name}</p>
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
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <button 
                        className="absolute right-0 z-10 top-1/2 font-bold bg-[rgba(0,0,0,0.8)] p-2 rounded-[50%]" 
                        style={{transform: 'translate(0, -50%)'}}
                        onClick={() => {
                            if(slider.count < getSliderResetCondition(data?.results?.length, MAX_SLIDER_SIZE, CARD_IMAGE_SIZE) ) return dispatch({type: 'increment'})
                            return dispatch({type: 'start'})
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </>
            }
            <div className="h-[300px] grid grid-flow-col py-2 transition duration-500" style={{transform: `translateX(-${(CARD_IMAGE_SIZE) * slider.count}px)`, maxWidth: `${MAX_SLIDER_SIZE}px`}}>
                {isLoading
                    ? <div className="justify-self-center self-center">Loading...</div>
                    :data?.results?.map((entry: any) => 
                    <MovieCard 
                        name={entry.original_title} 
                        description={entry.overview} 
                        playtime="2h" 
                        ratings={entry.vote_average} 
                        image={entry.poster_path}
                        id={entry.id} />)}
                {
                }

            </div>
        </div>
    )
}

type MSliderProps = {
    name: string;
    path: string;
}

export default MovieSlider