import React, {useState} from "react";
import { filmsSearch } from "../api/search";
import SearchedFilms from "./SearchedFilms";

interface Props {
    searchModal: boolean;
    setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number | undefined;
    updateFlag: React.Dispatch<React.SetStateAction<number>>;
}

const SearchModal: React.FC<Props> = ({searchModal, setSearchModal, userId, updateFlag}) => {

    const [keywords, setKeywords] = useState('');
    const [searchedFilms, setSearchedFilms] = useState<{nameRu: String; description: String; filmId: String; posterUrl: String}[]>();

    const searchFilms = async () => {
        try {
            const response = await filmsSearch.getFilms(keywords);
            
            setSearchedFilms(response.data.films);
        } catch (e) {}
    }

    return (
        <section
            onClick={() => setSearchModal(false)}
            className="p-2 fixed w-[100%] h-[100%] top-0 left-0 bg-[rgba(0,0,0,0.8)] z-10"
            style={searchModal ? { display: 'flex' } : { display: 'none' }}
        >
            <div
                onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                className="flex absolute p-5 bg-[#181c24] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded z-10 cursor-default w-[60%] md:w-[100%] md:h-[100%]"
            >
                <div className="flex flex-col w-[100%] justify-between">
                    <section className="flex w-[100%] justify-between mb-5">
                        <input
                            type="text"
                            className="p-[8px] outline-none bg-[#30343b] rounded w-[83%] md:w-[65%]"
                            onChange={
                                async (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setKeywords(event.target.value);
                                }
                            }
                        />
                        <button
                            className="w-[15%] bg-[#30343b] p-2 rounded hover:bg-inherit transition md:w-[30%]"
                            onClick={searchFilms}
                        >
                            Найти
                        </button>
                    </section>

                    <SearchedFilms searchedFilms={searchedFilms} userId={userId} updateFlag={updateFlag} setSearchModal={setSearchModal} />
                </div>
            </div>
        </section>
    )
}

export default SearchModal;