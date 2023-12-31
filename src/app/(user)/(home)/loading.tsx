'use client'
import { FC } from "react";
import {CircularProgress} from "@mui/material";

interface LoadingProps {
}

//bang

const Loading: FC<LoadingProps> = ({}) => {
    return (
        <div className={'flex justify-center w-screen items-center absolute z-100 h-screen bg-light'}>
            <CircularProgress color="secondary"/>
        </div>
    );
};

export default Loading;