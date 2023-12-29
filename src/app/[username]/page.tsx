'use client';

import { UserApi } from "../../api/user";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { FilmsApi } from "../../api/films";
import Films from "../../components/Films";
import Avatar from "../../components/Avatar";
import { IFilm } from "../../interfaces/IFilm";
import cl from '../../components/styles/bganimate.module.css'

const UserProfile = () => {
    const pathname = usePathname();
    const [userId, setUserId] = useState<number | undefined>();
    const [films, setFilms] = useState<
        {
            name: string;
            films: IFilm[]
        }[] | undefined
        >();

    const [user, setUser] = useState<{avatarLink: string; username: string; createdAt: string}>();
    


    useEffect(() => {
        async function getData() {
            const data = (await UserApi.getUserByNickname(pathname.replace("/", ""))).data;

            if (data.isOk) {
                const filmsResponseV2 = await FilmsApi.getListV2(data.user.id);
                setFilms(filmsResponseV2.data.films);

                setUser(data.user);

                setUserId(data.user.id);
            } else {
                setUserId(undefined);
            }
        }
        getData()
    }, [])

    return (
        <div>
            {
                userId ?
                <main className="w-[100%] flex flex-col items-center" >
                    <div className="flex mt-5 mb-10 p-4 bg-[#181c24] rounded items-center justify-between min-w-[400px] md:w-[100%]">
                        <Avatar size="150" link={user?.avatarLink} />
                        <div className="flex flex-col items-end">
                            <h1 className="ml-5 text-[1.2em]">
                                {user?.username}
                            </h1>
                            <p>
                                {
                                    user ? 
                                        <span className="text-[0.6em] text-[#909090]" >Registered: {String(new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'))}</span>
                                    : null
                                }
                            </p>
                        </div>
                    </div>
                    <Films allFilms={films} userId={userId}/>
                </main>
                :
                <main className="flex justify-center items-center w-[100%] h-[100vh]">
                    <p className={['flex justify-center items-center p-2 rounded ', cl.bganimate].join(' ')}>
                        Finding user...
                    </p>
                </main>
            }
        </div>
    )
}

export default UserProfile;