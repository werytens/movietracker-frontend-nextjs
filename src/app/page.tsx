"use client"

import Container from "../components/Container"
import { useState, useEffect } from "react";
import { AuthApi } from "../api/auth";
import { NewsApi } from "../api/news";

import cl from '../components/styles/bganimate.module.css'
import CreateNews from "../components/CreateNews";
import NewsEdit from "../components/NewsEdit";

export default function Home() {
    const [user, setUser] = useState<{ id: number; status: string; username: string; avatarLink: string; }>();
    const [posts, setPosts] = useState<{ id: number; title: string; description: string; image: string }[]>();
    const [activeContextIndex, setIndex] = useState<number | undefined>(undefined);
 

    const [isCreating, setCreating] = useState(false);

    const links = [
        {
            name: "Login",
            href: "/login"
        },
        {
            name: "GitHub",
            href: "https://github.com/werytens/MovieTracker2"
        }
    ]

    const updatePosts = async () => {
        const postsResponse = await NewsApi.getNews();
        setPosts(postsResponse.data.posts);
    };

    useEffect(() => {

        const token = localStorage.getItem('authToken');

        if (token) {
            const getData = async (token: string) => {
                const response = await AuthApi.me(token);
                setUser(response.data.userData);
            }

            getData(token);
            updatePosts();
        }
    }, [])



    return (
        <>
            <nav className="flex justify-center">
                <div className="flex items-center">
                    <h1 className="text-[2em] text-center uppercase">
                        Movietracker:
                    </h1>
                    {
                        links.map((item, index) => (
                            <a className="p-1.5 rounded bg-[#9e9e9e] hover:bg-[#8c7272] transition ml-2" href={item.href} key={index} >{item.name}</a>
                        ))
                    }
                </div>
            </nav>
            <div className="pl-[300px] pr-[300px]">
                <Container>
                    <header className="uppercase bg-[#181c24] p-2 rounded flex justify-between items-center">
                        <h1 className="text-[2em]">
                            News
                        </h1>
                        {
                            user?.username === 'werytens' ?
                                <button
                                    className="p-1 ml-3 rounded bg-[#88806c] hover:bg-[#756e59]"
                                    onClick={() => { setCreating(true) }}
                                >
                                    Post
                                </button>
                                : null
                        }
                    </header>
                    <CreateNews isCreating={isCreating} updatePosts={updatePosts} setCreating={setCreating} />
                    <main className="mt-4 bg-[#181c24] p-2 rounded">
                        <article>
                            {
                                posts ?
                                    posts.map((item, index) => (
                                        <div
                                            className="bg-[#16131a] p-2 rounded mb-5"
                                            style={posts.length - 1 === index ? { marginBottom: 0 } : null} key={Number(index + String('123124353200'))}
                                            onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                event.preventDefault();

                                                setIndex(index);
                                            }}
                                        >
                                            <div className="flex justify-between">
                                                <h1 className="text-[1.2em]">
                                                    {item.title}
                                                </h1>
                                                <NewsEdit activeContextIndex={activeContextIndex} index={index} setIndex={setIndex} item={item} updatePosts={updatePosts} />
                                            </div>
                                            <p className="mt-1 mb-1">
                                                {item.description}
                                            </p>
                                            {
                                                item.image ?
                                                    <img className="rounded max-h-[400px] w-[100%] object-cover" src={item.image} alt="" />
                                                    : null
                                            }
                                        </div>
                                    ))
                                    :
                                    <div className={['text-center p-2 rounded', cl.bganimate].join(' ')}>
                                        ...
                                    </div>
                            }
                        </article>
                    </main>
                </Container>
            </div>
        </>
    )
}
