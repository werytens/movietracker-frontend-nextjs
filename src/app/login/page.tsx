'use client'

import { useRouter } from 'next/navigation'
import { AuthApi } from '../../api/auth';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import React, { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';

export default function Login() {
    const [loginData, setLoginData] = useState<string[]>(['', '']);
    const { push } = useRouter();
 
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            const getUser = async () => {
                const response = await AuthApi.me(token);
                if (response.data.isOk) 
                    push('/profile');
            }
            getUser();
        }
    }, [])

    const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (loginData[0] !== '' && loginData[1] !== '') {
            const response = await AuthApi.loginUser(loginData[0], loginData[1]);

            if (!response.data.isOk) {
                NotificationManager.error(response.data.message);
            }

            loginData.forEach(item => { item = ''; })

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                push('/profile');
            }
        }
    }

    return (
        <div className=' absolute t-0 l-0 w-[100%] h-[100%]'>
            <section className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#181c24] text-[#909090] p-2 rounded w-[350px] flex flex-col">
                <h1 className="text-[1.6em] uppercase text-center text-[#ededed] select-none">
                    MovieTracker
                    <span className="text-[0.4em] ml-2 text-[#909090]">login</span>
                </h1>
                <form action="">
                    <input
                        type="text"
                        placeholder="username"
                        className="w-[100%] p-[8px] outline-none bg-[#30343b] rounded mt-[15px]"
                        value={loginData[0]}
                        onChange={(e) => setLoginData([e.target.value, loginData[1]])}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        className="w-[100%] p-[8px] outline-none bg-[#30343b] rounded mt-[15px]"
                        value={loginData[1]}
                        onChange={(e) => setLoginData([loginData[0], e.target.value])}
                    />

                    <div className="flex justify-center w-[100%] mt-[15px]">
                        <button
                            className="bg-[#7cb342] rounded p-[8px] hover:bg-[#3f5923] transition text-[#ededed]"
                            onClick={login}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </section>
            <NotificationContainer />
        </div>
    )
}
