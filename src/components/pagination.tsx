import { useRef, useState } from "react"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination: React.FC<PaginationProps> = ({pages, clickEv}) => {
    const [selected, setSelected] = useState(1)
    return(
        <div className="grid grid-cols-9 justify-center items-center py-1 px-2 gap-2">
            <button onClick={() => setSelected(prev => {
                    if(prev === 1) return prev
                    clickEv(prev - 1)
                    return prev - 1
                })}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
             {
                [...Array(pages)].map((el, index) => {
                    if(index === 0 && selected > 3) {
                        return (
                            <>
                                <div key={`pagination-${index + 1}`} >
                                    <button 
                                        onClick={() => {
                                            setSelected(index + 1)
                                            clickEv(index + 1)
                                        }}
                                        className={`px-3 py-1 rounded-lg  ${selected === index + 1 ? "bg-purple-600" : "hover:bg-neutral-500"}`}
                                    >
                                        {index + 1}
                                    </button>
                                </div>
                                <div key={`pagination-dots-start`} className={`px-3 py-1 col-start-3`}>
                                    ...
                                </div>
                            </>
                        )
                    } else if( index === 0 && selected === 3) {
                        return(
                            <div key={`pagination-${index + 1}`} >
                                <button onClick={() =>{
                                        setSelected(index + 1)
                                        clickEv(index + 1)
                                    }
                                }
                                    className={`px-3 py-1 rounded-lg  hover:bg-neutral-500`}
                                >
                                    {index + 1}
                                </button>
                            </div>
                        )
                    }
                    if(index === pages - 1 && selected < index - 1 ) {
                        return(
                            <>
                                <div key={`pagination-dots-end`} className={`px-3 py-1 col-auto`}>
                                    ...
                                </div>
                                <div key={`pagination-${index + 1}`} className="col-start-8">
                                    <button 
                                        onClick={() => {
                                            setSelected(index + 1)
                                            clickEv(index + 1)
                                        }}
                                        className={`px-3 py-1 rounded-lg ${selected === index + 1 ? "bg-purple-600" : "hover:bg-neutral-500"}`}
                                    >
                                        {index + 1}
                                    </button>
                                </div>
                            </>
                        )
                    } else if( index === pages - 1 && selected === index - 1) {
                        return (
                            <div key={`pagination-${index + 1}`} >
                                <button 
                                    onClick={() => {
                                        setSelected(index + 1)
                                        clickEv(index + 1)
                                    }}
                                    className={`px-3 py-1 rounded-lg ${selected === index + 1 ? "bg-purple-600" : "hover:bg-neutral-500"}`}
                                >
                                    {index + 1}
                                </button>
                            </div>
                        )
                    }
                    if(index < selected - 2 || index > selected) {
                        return(<></>)
                    }
                    return(
                        <div key={`pagination-${index + 1}`} >
                            <button 
                                onClick={() => {
                                    setSelected(index + 1)
                                    clickEv(index + 1)
                                }}
                                className={`px-3 py-1 rounded-lg  ${selected === index + 1 ? "bg-purple-600" : "hover:bg-neutral-500"}`}
                            >
                                {index + 1}
                            </button>
                        </div>
                    )
                })
             }
            <button 
                onClick={() => {
                    setSelected(prev => {
                        if(prev === pages) return prev
                        clickEv(prev + 1)
                        return prev + 1
                    })
                }
            }
                className="col-start-9"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
    </div>
    )
}

interface PaginationProps {
    pages: number;
    clickEv: (page: number) => void;
}

export default Pagination