import React, {useState} from "react";
import { NewsApi } from "../api/news";

interface Props {
    isCreating: boolean;
    updatePosts: () => Promise<void>;
    setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNews: React.FC<Props> = ({isCreating, updatePosts, setCreating}) => {

    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    return (
        <>
            {
                isCreating ?

                    <div className="bg-[#181c24] p-2 rounded flex mt-4 flex-col">
                        <h2 className="uppercase mb-2 text-[1.2em]">
                            Create new post
                        </h2>
                        <form className="flex flex-col">
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value) }}
                                className="mb-2 p-2 rounded outline-none bg-[#100e12]"
                                type="text"
                                placeholder="Title"
                            />
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDesc(event.target.value) }}
                                className="mb-2 p-2 rounded outline-none bg-[#100e12]"
                                type="text"
                                placeholder="Description"
                            />
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setImage(event.target.value) }}
                                className="mb-2 p-2 rounded outline-none bg-[#100e12]"
                                type="text"
                                placeholder="Image link"
                            />
                            <button
                                className=" mt-2 bg-[#82a37a] p-1 rounded hover:bg-[#657d5f] transition"
                                onClick={async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    event.preventDefault();

                                    await NewsApi.createNewPost(title, desc, image);
                                    await updatePosts();
                                    setCreating(false);
                                }}
                            >
                                Create
                            </button>
                        </form>
                    </div>

                    : null
            }
        </>
    )
}
export default CreateNews;