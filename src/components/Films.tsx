import React, { useEffect, useState } from "react";
import FilmList from "./FilmList";
import { AuthApi } from "../api/auth";
import { IFilm } from "../interfaces/IFilm";
import cl from './styles/bganimate.module.css'

interface Props {
    allFilms: {
        name: string;
        films: IFilm[]
    }[] | undefined;
    userId: number | undefined;
    updateFlag?: React.Dispatch<React.SetStateAction<number>>;
    filmsDuration?: number;
    setDuration?: React.Dispatch<React.SetStateAction<number>>;
}

const Films: React.FC<Props> = ({ allFilms, userId, updateFlag, filmsDuration, setDuration }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(1);

    const [isOwner, setIsOwner] = useState(false);
    const [durations, setStatusDuration] = useState<undefined | number[]>();

    const setDurations = async () => {
        if (allFilms) {
            const arrayOfDurations = allFilms.map((statusItem, index) => statusItem.films && statusItem.films.length > 0 ?
                (
                    statusItem.films.map(item => (Number(item.runtime.replace(' min', '')) * (item.seasonsCount ? item.episodesCount : 1)) 
                        + (item.rewatchCount ? item.rewatchCount * (Number(item.runtime.replace(' min', '')) *
                        (item.seasonsCount ? item.episodesCount : 1)) : 0))
                        .reduce((acc, number) => acc + (number || 0)
                    )
                )
            : null)
            
            setStatusDuration(arrayOfDurations)
        }
    }

    useEffect(() => {
        const get = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                if (userId) {
                    const res = await AuthApi.me(token);
                    
                    if (res.data.isOk) {
                        if (res.data.userData.id === userId) {
                            setIsOwner(true);
                        }
                    }
                }
            }
        }
        
        get();
    }, [userId]);

    useEffect(() => { setDurations(); }, [allFilms]);

    return (
        <section className="bg-[#181c24] p-2 rounded w-[80%] flex flex-col justify-between mb-10 md:w-[100%] md:text-[0.6em]">
            {
                allFilms ? allFilms.map((statusItem, index: number) => (
                    <section key={index + 1000000}
                        className="flex flex-col select-none my-2" onClick={
                            () => {
                                if (index !== activeIndex) {
                                    setActiveIndex(index);
                                } else {
                                    setActiveIndex(undefined);
                                }
                            }
                        }
                    >
                        <div className="text-center p-2 bg-[#0c0e12] rounded transition cursor-pointer hover:shadow-lg hover:shadow-[#2e2c99] hover:text-[#2e2c99]">
                            <p>
                                {statusItem.name.toLocaleUpperCase()}
                            </p>
                            <p>
                                {statusItem.films && statusItem.films.length > 0 ? statusItem.films.length + '  films • ' : null}
                                {
                                    durations && durations[index] ?
                                    (durations[index] / 60).toFixed(2) + ' hours'
                                    : null
                                }
                            </p>
                        </div>
                        {
                            statusItem.films ?
                                <FilmList 
                                    films={statusItem.films} 
                                    visible={activeIndex === index} 
                                    userId={userId} updateFlag={updateFlag} 
                                    isOwner={isOwner} 
                                    statusIndex={index} 
                                    filmsDuration={filmsDuration}
                                    setDuration={setDuration}
                                    durations={durations}
                                    setStatusDuration={setStatusDuration}
                                />
                                : null
                        }
                    </section>
                )) :
                    <>
                        {
                            (new Array(6).fill(0)).map((item, index) => (
                                <div
                                    key={Number(index + '45300000')}
                                    className={['flex justify-center items-center p-2 my-2 min-h-[60px]  rounded transition cursor-pointer', cl.bganimate].join(' ')}
                                >...</div>
                            ))
                        }
                    </>
            }
        </section>
    )
}

export default Films;