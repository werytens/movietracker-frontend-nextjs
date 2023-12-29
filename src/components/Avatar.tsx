import React from "react"
import Image from "next/image";
import cl from './styles/bganimate.module.css'

interface Props {
    link: string | undefined;
    size: string;
}

const Avatar: React.FC<Props> = ({link, size}) => {
    return (
        <div>
            {
                link ?
                <img className="rounded-[100%] object-cover" src={link} style={{width: size + 'px', height: size + 'px'}} alt="" />
                :
                <div className={['rounded-full', cl.bganimate].join(' ')} style={{width: size + 'px', height: size + 'px'}} ></div>
            }
        </div>
    )
}

export default Avatar;