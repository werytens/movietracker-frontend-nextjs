import React from "react"
import { FilmsApi } from "../api/films";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

interface Props {
    searchedFilms: { nameRu: String; description: String; filmId: String; posterUrl: String }[] | undefined;
    userId: number | undefined;
    updateFlag: React.Dispatch<React.SetStateAction<number>>;
    setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchedFilms: React.FC<Props> = ({ searchedFilms, userId, updateFlag, setSearchModal }) => {

    const addFilm = async (item: {filmId: String, nameRu: String}) => {
        if (userId) {
            const response = await FilmsApi.addFilm(Number(userId), Number(item.filmId), String(item.nameRu))

            if (!response.data.isOk) {
                NotificationManager.error(response.data.message);
            }
            else {
                setSearchModal(false);
                updateFlag(Math.floor(Math.random() * 30));
                return
            }
        }
    }

    return (
        <div className="overflow-y-scroll h-[500px] md:w-[100%] md:h-[100%]">
            <NotificationContainer />
            {
                searchedFilms ? (
                    searchedFilms.map((item, index) => (
                        <div
                            className="flex mb-10" key={index}
                            onClick={async () => { await addFilm(item) }}
                        >
                            <img src={String(item.posterUrl)} className="h-[200px] w-[120px] object-cover rounded mr-5 mb-5" />
                            <div>
                                <p className="mb-3">
                                    {item.nameRu}
                                </p>

                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}

export default SearchedFilms;