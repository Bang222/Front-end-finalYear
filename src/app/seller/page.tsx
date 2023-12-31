'use client'
import {FC} from 'react';
import {NextPage} from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Link from "next/link";
import * as React from "react";
import ModalCreateStore from "@/components/user/modal/ModalCreateStore";
import {useMutation} from "@tanstack/react-query";
import {bookingAPI, createStoreAPI} from "@/util/api/apiReuqest";
import {useSelector} from "react-redux";
import {CreateStoreDTO, informationStoreDTO} from "@/types/seller";
import {useRouter} from "next/navigation";

interface PageProps {
}

const Page: ({}: {}) => React.JSX.Element | void = ({}) => {
    // @ts-ignore
    const role = useSelector<string>((state) => state.auth.value?.user?.role)
    const isAuth = useSelector<any>((state) => state.auth.value?.isAuth)
    const containerStyle:React.CSSProperties = {
        backgroundImage: `url('https://wallpaperaccess.com/full/3397663.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    };
    const overlayStyle:React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    };
    const router = useRouter()
    return role !== 'seller' ?  (
        <section className={'w-screen h-screen'} style={containerStyle}>
            <div style={overlayStyle}></div>
            <div
                className={'absolute ml-4 mt-4 w-fit text-white hover:underline'}>
                <Link href={'/tour'}>Back</Link>
            </div>
            <div className={'absolute z-10 left-[17%] top-[18%] sm:top-[28%] right-[10%] text-white'}>
                <div>
                    <LargeHeading className={'mb-5 text-center'}>CREATE BUSINESS ACCOUNT</LargeHeading>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Paragraph className={'mb-10 text-center'}>You don't have any business account yet, start now to start the business process on
                        DaNang Traval for your business. With a business account on DaNang Traval, you can run, manage
                        and grow your business holistically.</Paragraph>
                    <div className={'flex w-full justify-center'}>
                        <ModalCreateStore />
                    </div>
                </div>
            </div>
        </section>
    ): router.push('/seller/manager')
}

export default Page;
