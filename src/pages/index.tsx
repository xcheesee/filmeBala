import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypeOf } from "zod";
import MovieCard from "../components/movieCard";

const Home: NextPage = () => {

    return(
        <>
            <div className="w-full relative overflow-hidden" style={{height: "calc(100vh - 56px)"}}>
                <div className="absolute z-10 h-full w-full bg-[rgba(0,0,0,0.85)] flex flex-col justify-center items-center gap-4">
                    <p className="text-7xl tracking-widest font-light  py-8">SO FILME BALA</p>
                    <p className="text-3xl">De Mafioso, De Guerra, De Luta, De Tiro, etc. so os bom mlk.</p>
                    <p className="text-3xl">Vem de arrasta pra cima que eh sucesso, tudo gratis.</p>
                </div>
                <div className={`min-h-full flex relative  infiniteScroll`}>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                    <div className="relative min-w-full">
                        <Image src='/wp1945898.jpg' fill alt="" style={{objectFit: "cover"}}/>
                    </div>
                </div>
            </div>
            <div className="py-8 lg:px-4">
                <p>Populares</p>
                <div className="w-full h-[300px] bg-red-200 gap-4 flex py-2">
                    <MovieCard />
                    <MovieCard />
                </div>
            </div>
            <div className="py-8 lg:px-4">
                <p>Tiro</p>
                <div className="w-full h-[300px] bg-red-200"></div>
            </div>
            <div className="py-8 lg:px-4">
                <p>Guerra</p>
                <div className="w-full h-[300px] bg-red-200"></div>
            </div>
        </>
    )
}

export default Home