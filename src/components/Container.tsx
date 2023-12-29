import React from "react"

interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({children}) =>{
    return (
        <div className="px-20 mt-10 md:px-0 md:mt-10">
            {children}
        </div>
    )
}

export default Container;