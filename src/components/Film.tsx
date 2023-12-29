import React, { useState, useEffect } from "react"
import { FilmsApi } from "../api/films";

import RedoIcon from '@mui/icons-material/Redo';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import { IFilm } from "../interfaces/IFilm";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

interface Props {
    film: IFilm | undefined;
    index: number;
    userId: number | undefined;
    updateFlag?: React.Dispatch<React.SetStateAction<number>>;
    isOwner?: boolean
    filmsDuration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    durations: number[];
    setStatusDuration: React.Dispatch<React.SetStateAction<number[]>>;
    statusIndex: number;
}

const Film: React.FC<Props> = (
        { film, index, userId, updateFlag, isOwner, filmsDuration, setDuration, durations, setStatusDuration, statusIndex }
    ) => {

    const [visible, setVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>('favorite');
    const [rewatchCount, setRewatch] = useState(film?.rewatchCount ? film?.rewatchCount : 0);
    const [rate, setRate] = useState(film?.userRate);
    const [description, setDesc] = useState(film?.userDescription);
    const [newDesc, setNewDesc] = useState(film?.userDescription);

    const changeStatus = async () => {
        const newStatusId = (await FilmsApi.getStatuses()).data.data.find((item: { id: Number; name: String }) => item.name === selectedStatus).id;

        if (userId && film && newStatusId) {
            await FilmsApi.changeFilmStatus(userId, film.id, newStatusId)
            setVisible(false);
            if (updateFlag) {
                updateFlag(Math.floor(Math.random() * 30));
            }
        }
    }

    const deleteFilm = async () => {
        if (userId && film) {
            await FilmsApi.deleteFilm(userId, film.id);
            setVisible(false);
            if (updateFlag) {
                updateFlag(Math.floor(Math.random() * 30));
            }
        }
    }

    const changeRewatch = async (operation: string) => {
        const amount = eval(rewatchCount + operation + 1);

        if (amount >= 0) {
            setRewatch(amount)
            await FilmsApi.changeFilmRewatch(userId, film?.id, amount)
            setDuration(eval(filmsDuration + operation + Number(film.runtime.replace(" min", ''))))

            const newDurations = durations;
            newDurations[statusIndex - 1] = eval(newDurations[statusIndex - 1] + operation + Number(film.runtime.replace(" min", '')))
            setStatusDuration(newDurations)
        }
    }

    return (
        <section
            className="flex flex-col w-[100%]"
            onClick={() => { setVisible(!visible) }}
        >
            <div
                className="mt-2 flex items-center justify-between w-[100%] bg-[#131017] p-1 rounded cursor-pointer hover:bg-[#110b1a] transition select-none"
                style={visible ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}}
            >
                <p className="flex items-center">

                    <span className="text-[#909090] mr-5">
                        {index + 1}
                    </span>

                    {film?.title}
                </p>

                <div className="flex">
                    <p className="flex items-center text-[#909090] p-0.5 rounded bg-[#050404] leading-0 mr-3">
                        <span className="text-[0.7em] mr-2">
                            {rewatchCount ? rewatchCount : 0}
                        </span>
                        <span
                            className="flex h-[3px] justify-center self-center items-center"
                        >
                            <RedoIcon style={{ fontSize: '0.8em' }} />
                        </span>
                    </p>
                    <p className="flex items-center text-[#909090] p-0.5 rounded bg-[#050404] leading-0">
                        <span className="text-[0.7em] mr-2">
                            {rate ? rate : '-'}
                        </span>
                        <span
                            className="flex h-[3px] justify-center self-center items-center"
                        >
                            <ThumbsUpDownIcon style={{ fontSize: '0.8em' }}  />
                        </span>
                    </p>
                </div>
            </div>
            {
                visible ?
                    <div
                        className="bg-[#131017] rounded-b p-4 mb-2 flex-col"
                        style={visible ? { display: 'flex' } : { display: 'none' }}
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => { event.stopPropagation() }}
                    >
                        <div className="flex">
                            <img src={film?.poster} alt="" className="h-[300px] w-[180px] object-cover rounded mr-10 md:h-[150px] md:w-[90px] md:mr-3" />

                            <div className="flex flex-col justify-between">
                                <p>
                                    {film?.description}
                                </p>
                                <p className="flex flex-col">
                                    <span className="mr-2">
                                        {film?.genre}
                                    </span>
                                    <span>
                                        {film?.releaseDate}
                                    </span>
                                </p>
                                <p className="mr-2">
                                    {film?.rate} <GradeIcon /> {film?.votersCount} <GroupIcon />
                                </p>
                                <p>
                                    Runtime: {film?.runtime} 
                                    {
                                        film?.seasonsCount ?
                                        <span> • {film?.seasonsCount + ' seasons '}• {film?.episodesCount + ' episodes'}</span>
                                        : null
                                    }
                                </p>

                                {
                                    isOwner ?
                                        <div className="flex items-center">
                                            <label htmlFor={'changeStatus_' + film?.id}>Изменить статус: </label>
                                            <select
                                                className="bg-[#131017] b-2 b-solid b-[white]"
                                                id={'changeStatus_' + film?.id}
                                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedStatus(event.target.value) }}
                                            >
                                                <option value="favorite">Favorite</option>
                                                <option value="planned">Planned</option>
                                                <option value="delayed">Delayed</option>
                                                <option value="watching">Watching</option>
                                                <option value="watched">Watched</option>
                                                <option value="abandoned">Abandoned</option>
                                            </select>
                                            <button
                                                className="p-1 rounded bg-[#4b8c41] hover:bg-[#83d676] ml-3 transition"
                                                onClick={changeStatus}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="p-1 ml-3 rounded bg-[#a81414] hover:bg-[#520202] transition flex justify-center items-center"
                                                onClick={deleteFilm}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                        {
                            isOwner ?
                                <div className="mt-5">
                                    <div className="h-[30px]">
                                        <label htmlFor={'rate_' + film?.id}>
                                            Изменить оценку: <b></b>
                                        </label>
                                        <input 
                                            className="w-[30px] h-[30px] text-center justify-center items-center outline-none bg-[#050404] rounded " 
                                            id = {'rate_' + film?.id} type="text" 
                                            value={rate ? rate : '-'} 
                                            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => 
                                                {
                                                    const data = event.target.value;
                                                    let rate = Number(data[data.length - 1]);

                                                    if (data[data.length - 2] === '1' && data[data.length - 1] === '0') {
                                                        rate = 10;
                                                    }

                                                    if (data[data.length - 1] === '-') {    
                                                        rate = null;                                                    
                                                    }
                                                     
                                                    if (rate === null || !isNaN(rate) && rate > 0 && rate < 11) {
                                                        setRate(rate);
                                                        await FilmsApi.changeFilmRate(userId, film?.id, rate)
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center h-[30px]">
                                        <p className="mr-2">
                                            Повторные просмотры:
                                        </p>
                                        <button 
                                            className=" hover:bg-inherit transition-all w-[30px] h-[30px] rounded bg-[#050404] text-center flex justify-center items-center"
                                            onClick={() => {changeRewatch('+')}}
                                        >
                                            +
                                        </button> 
                                        <span className="mx-4 w-[30px] h-[30px] rounded bg-[#050404] text-center flex justify-center items-center" >
                                            {rewatchCount ? rewatchCount : 0}
                                        </span> 
                                        <button 
                                            className=" hover:bg-inherit transition-all w-[30px] h-[30px] rounded bg-[#050404] text-center flex justify-center items-center"
                                            onClick={() => {changeRewatch('-')}}
                                        >
                                            -
                                        </button> 
                                        
                                    </div>
                                </div>
                                : null
                        }
                        {
                            isOwner ? 

                            <div className="flex flex-col">
                                <textarea 
                                    className="rounded min-h-[100px] max-w-[100%] bg-[#050404] mt-3 p-2 outline-none text-[1em] resize-none"
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {setNewDesc(event.target.value)}}
                                    value={newDesc ? newDesc : ''}
                                ></textarea>
                                <button 
                                    style={description === newDesc ? {display: 'none'} : {display: 'block'}}
                                    className="p-1 rounded bg-[#4b8c41] hover:bg-[#83d676] mt-2 transition"
                                    onClick={ async () => {
                                        
                                        await FilmsApi.changeFilmDescription(userId, film?.id, newDesc)
                                        setDesc(newDesc)

                                    }}
                                >
                                    Save
                                </button>
                            </div>

                            :

                            <p className="rounded min-h-[100px] w-[100%] bg-[#050404] mt-3 p-2 outline-none text-[1em]">{description}</p>
                        }
                    </div>
                    : null
            }
        </section>
    )
}

export default Film;