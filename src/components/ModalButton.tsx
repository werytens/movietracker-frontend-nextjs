import React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
    callback: () => void;
}

const ModalButton: React.FC<Props> = ({ callback }) => {
    return (
        <button
            className="absolute top-[0] w-[50px] rounded bg-[#181c24] rounded-t-none text-[#ededed] hover:bg-[grey] transition"
            onClick={callback}
        >
            <ArrowDropDownIcon />
        </button>
    )
}

export default ModalButton;