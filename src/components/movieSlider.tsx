import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { CARD_IMAGE_SIZE } from "../utils/constants";
import MovieCard from "./movieCard";

const MovieSlider: React.FC<MSliderProps> = ({name, path}) => {
    const { isLoading, error, data } = useQuery([`${name}Data`], async () => await ( await fetch(path)).json())
    const [slider, dispatch] = useReducer(reducer, {count: 0})
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
        <div className="py-8 lg:px-4 relative overflow-hidden">
            <p className="capitalize">{name}</p>
            <button 
                className="absolute left-10 z-10 top-1/2 font-bold bg-[rgba(0,0,0,0.8)] p-2 rounded-[50%]" 
                style={{transform: 'translate(0, -50%)'}}
                onClick={() => {
                    if(slider.count > 0) {
                        return dispatch({type: 'decrement'})
                    }
                    return dispatch({type: 'end'})
                }}>{'<'}</button>
            <button 
                className="absolute right-10 z-10 top-1/2 font-bold bg-[rgba(0,0,0,0.8)] p-2 rounded-[50%]" 
                style={{transform: 'translate(0, -50%)'}}
                onClick={() => {
                    if(slider.count < 13 ) {
                        return dispatch({type: 'increment'})
                    }
                    return dispatch({type: 'start'})
                }}>{'>'}</button>
            <div className="h-[300px] gap-5 flex py-2 transition duration-500 relative" style={{transform: `translateX(-${(CARD_IMAGE_SIZE + 20) * slider.count}px)`}}>
                {data?.results?.map((entry: any) => 
                <MovieCard 
                    name={entry.original_title} 
                    description={entry.overview} 
                    playtime="2h" 
                    ratings={entry.vote_average} 
                    image={entry.poster_path}
                    id={entry.id} />)}

            </div>
        </div>
    )
}

type MSliderProps = {
    name: string;
    path: string;
}

export default MovieSlider