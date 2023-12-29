import { FC, useRef, useState } from "react";

import Avatar from "../components/Avatar";
import EditAvatarOverlay from "./EditAvatarOverlay";
import { UserApi } from "../api/user";

interface Props {
    hash?: string;
    size: string;
    // onFileChange: (files: FileList | null) => void;
    userId: number | undefined;
}

export const EditableAvatar: FC<Props> = ({ hash, size, userId }) => {
    // const fileInputRef = useRef<HTMLInputElement>(null);

    const [link, setLink] = useState('');
    const [visible, setVisible] = useState(false);

    const changeAvatar = async () => {
        if (userId) {
            await UserApi.changeAvatar(userId, link);
            window.location.reload();
        }
    }

    return (
        <>
            <section
                className="p-2 absolute w-[100%] h-[100%] top-0 left-0 bg-black z-10"
                style={visible ? { display: 'block' } : { display: 'none' }}
                onClick={() => setVisible(false)}
            >
                <div className="absolute p-5 bg-[#181c24] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded z-10 cursor-default w-[60%] flex justify-between"
                    onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                >
                    <input
                        type="text"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLink(event.target.value) }}                    
                        className="w-[87%] rounded p-1 outline-none text-black"
                        placeholder="New avatar link"
                    />
                    <button className="p-1 bg-[#fffb80] text-black rounded w-10%]" onClick={changeAvatar}>Change</button>
                </div>
            </section>
            {/* <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                // onChange={(event) => onFileChange(event.currentTarget.files)}
                onChange={callback}
            /> */}
            <EditAvatarOverlay
                // onClick={() => fileInputRef?.current?.click()}
                onClick={() => {setVisible(true)}}
            >
                <Avatar link={hash} size={size}/>
            </EditAvatarOverlay>
        </>
    );
};

export default EditableAvatar;