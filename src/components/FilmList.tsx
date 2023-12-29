import React from "react";
import Film from "./Film";
import { IFilm } from "../interfaces/IFilm";

interface Props {
    films: (IFilm | undefined)[];
    visible: boolean;
    userId: number | undefined;
    updateFlag?: React.Dispatch<React.SetStateAction<number>>;
    isOwner?: boolean;
    statusIndex: number;
    filmsDuration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    durations: number[];
    setStatusDuration: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilmList: React.FC<Props> = (
        { films, visible, userId, updateFlag, isOwner, statusIndex, filmsDuration, setDuration, durations, setStatusDuration }
    ) => {

    return (
        <div 
            style={visible ? {display: 'flex'} : {display: 'none'}}
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {event.stopPropagation()}}
            className="flex flex-col"
        >
            {
                films.length > 0 ?
                films.map((item, index) => (
                    <Film 
                        key={Number(index + String(statusIndex))} 
                        index={index} film={item} 
                        userId={userId} 
                        updateFlag={updateFlag} 
                        isOwner={isOwner} 
                        filmsDuration={filmsDuration}
                        setDuration={setDuration}
                        durations={durations}
                        setStatusDuration={setStatusDuration}
                        statusIndex={index}
                    />
                ))
                : <span>Тут ничего нет</span>
            }
        </div>
    )
}

export default FilmList;