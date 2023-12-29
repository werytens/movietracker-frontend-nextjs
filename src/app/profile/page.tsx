"use client"

import { useEffect, useState } from "react"
import { AuthApi } from "../../api/auth"
import RightBar from "../../components/RightBar";
import Container from "../../components/Container";
import { FilmsApi } from "../../api/films";
import SearchModal from "../../components/SearchModal";
import ModalButton from "../../components/ModalButton";
import Films from "../../components/Films";
import { IFilm } from "../../interfaces/IFilm";

import { useRouter } from 'next/navigation'


export default function Profile() {
    const [user, setUser] = useState<{ id: number; status: string; username: string; avatarLink: string; }>();
    const [searchModal, setSearchModal] = useState(false);
    const [filmsDuration, setDuration] = useState(0);

    const { push } = useRouter();

    const [updateFlag, setUpdateFlag] = useState(0);
    const [films, setFilms] = useState<
        {
            name: string;
            films: IFilm[]
        }[] | undefined
    >();

    useEffect(() => {

        const token = localStorage.getItem('authToken');

        if (token) {
            const getData = async (token: string) => {
                const response = await AuthApi.me(token);

                setUser(response.data.userData);
            }

            getData(token);
        } else {
            push('/login')
        }

    }, [])

    useEffect(() => {
        if (films && films.length > 0) {
            const result = [films[0], films[4]].map(item => {
                if (item.films && item.films.length) {
                    return item.films
                        .map(element => {
                            if (element.runtime.includes('min')) {
                                return (Number(element.runtime.replace(' min', '')) * (element.seasonsCount ? element.episodesCount : 1)) + (element.rewatchCount ? element.rewatchCount * (Number(element.runtime.replace(' min', '')) * (element.seasonsCount ? element.episodesCount : 1)) : 0);
                            } else {
                                return 0;
                            }
                        })
                } else {
                    return 0;
                }})
    
            setDuration(result.flat().reduce((acc, item) => Number(acc) + Number(item)))
        }
    }, [films])

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            const getFilms = async () => {
                const response = await AuthApi.me(token);

                const filmsResponseV2 = await FilmsApi.getListV2(response.data.userData.id);
                setFilms(filmsResponseV2.data.films);
            }
            getFilms();
        }
    }, [updateFlag])


    return (
        <Container>
            <ModalButton callback={() => setSearchModal(true)} />
            <SearchModal updateFlag={setUpdateFlag} userId={user?.id} searchModal={searchModal} setSearchModal={setSearchModal} />

            <div className="flex justify-between text-[#ededed] md:flex-col-reverse md:w-[100%]">
                <Films
                    allFilms={films}
                    userId={user?.id}
                    updateFlag={setUpdateFlag}
                    filmsDuration = {filmsDuration}
                    setDuration = {setDuration}
                />
                <RightBar
                    user={user}
                    filmsLength={
                        Number(filmsDuration)
                    }
                    filmsCount={films && films.length > 0 ? [films[0], films[4]].map(item => item.films.length).reduce((acc, number) => acc + number) : 0}
                />
            </div>
        </Container>
    )
}