import { FC, ReactNode } from "react";

import { Edit } from "@mui/icons-material";

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const EditAvatarOverlay: FC<Props> = ({ children, onClick }) => {
    return (
        <div className="relative">
            {children}
            <div
                className="group left-0 top-0 absolute w-full h-full"
                role="button"
                onClick={onClick}
            >
                <div className="p-1 rounded-full flex justify-end items-end bg-neutral bg-opacity-40 invisible group-hover:visible w-full h-full">
                    <Edit className="text-secondary-bg" />
                </div>
            </div>
        </div>
    );
};

export default EditAvatarOverlay;