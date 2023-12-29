import { NewsApi } from "../api/news";
import React, {useState} from 'react';

interface Props {
    activeContextIndex: number;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    item: {
        id: number;
        title: string;
        description: string;
        image: string;
}   ;
    updatePosts: () => Promise<void>;
}

const NewsEdit: React.FC<Props> = ({ activeContextIndex, index, setIndex, item, updatePosts }) => {

    const [editText, setEditText] = useState('');

    return (
        <>
            {
                activeContextIndex === index ?
                    <div className="flex items-center w-[60%] justify-between">
                        <form action="">
                            <input
                                className="p-1 rounded outline-none bg-[#130d1a]"
                                type="text"
                                placeholder="edit"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEditText(event.target.value) }}
                            />
                            <button
                                className="ml-2 p-1 rounded bg-[#ab8ad1] transition hover:bg-[#825eab]"
                                onClick={async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    event.preventDefault();

                                    const [element, data] = editText.split('"EDIT"');

                                    setIndex(undefined);

                                    switch (element) {
                                        case "description":
                                            await NewsApi.editDescription(item.id, data);
                                            break;
                                        case "title":
                                            await NewsApi.editTitle(item.id, data);
                                            break;
                                        case "image":
                                            await NewsApi.editImage(item.id, data);
                                            break;
                                    }

                                    await updatePosts();
                                }}
                            >
                                Edit
                            </button>
                        </form>
                        <button
                            className="ml-2 p-1 rounded bg-[#ab8ad1] transition hover:bg-[#825eab]"
                            onClick={async () => {
                                await NewsApi.delete(item.id);
                                setIndex(undefined);
                                updatePosts();
                            }}
                        >Delete</button>
                    </div>
                    : null
            }
        </>
    )
}
export default NewsEdit;