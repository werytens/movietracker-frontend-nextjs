import React, { useState } from "react"
import Avatar from "./Avatar";
import EditableAvatar from "./EditableAvatar";
import { UserApi } from "../api/user";
import cl from './styles/bganimate.module.css'

interface Props {
    user: {id: number; status: string; username: string; avatarLink: string;} | undefined;
    filmsLength: number | undefined;
    filmsCount: number | undefined;
}

const RightBar: React.FC<Props> = ({user, filmsLength, filmsCount }) => {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');

    const changePassword = async () => {
        if (user) {
            await UserApi.changePassword(user.id, password);
            window.location.reload();
        }
    }

    return (
        <div className="w-[18%] h-[400px] mb-5 bg-[#181c24] p-2 rounded flex flex-col justify-between md:w-[100%]">
            
            <section className="flex flex-col items-center">
                <EditableAvatar userId = {user?.id} hash={user?.avatarLink} size="150" />

                <div className="mt-5 w-[100%] flex justify-center">
                    {
                        user ? 
                        <p>{user.username}</p>
                        : 
                        <div className={['h-6 w-[80%] rounded', cl.bganimate].join(' ')}></div>
                    }
                </div>
            </section>

            <section className=" flex justify-center text-center text-[0.8em] mt-4 mb-4">

                {
                    filmsLength ?
                    <p>Watched: {filmsCount} films • {(filmsLength / 60).toFixed(2) + ' hours'}</p>
                    :
                    <div className={['h-6 w-[90%] rounded', cl.bganimate].join(' ')}></div>
                }

                
            </section>

            <section className="w-[100%] flex justify-center">
                <section
                    className="p-2 absolute w-[100%] h-[100%] top-0 left-0 bg-black z-10"
                    style={visible ? { display: 'block' } : { display: 'none' }}
                    onClick={() => setVisible(false)}
                >
                    <div className="absolute p-5 bg-[#181c24] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded z-10 cursor-default w-[60%] flex justify-between"
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                    >
                        <input
                            type="password"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }}                    
                            className="w-[87%] rounded p-1 outline-none text-black"
                            placeholder="New password"
                        />
                        <button className="p-1 bg-[#fffb80] text-black rounded w-10%]" onClick={changePassword}>Change</button>
                    </div>
                </section>

                <button
                    className="text-[0.5em] p-2 rounded bg-[#663f44] hover:bg-[#8a585e] transition"
                    onClick={() => setVisible(true)}
                >
                    Change Password
                </button>
            </section>
        </div>
    )
}

export default RightBar;