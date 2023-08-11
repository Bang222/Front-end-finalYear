import React, {FC, useEffect} from 'react';
import {Card, CircularProgress} from "@mui/material";
import Paragraph from "@/components/ui/Paragraph";
import CloseIcon from "@mui/icons-material/Close";
import LineCustom from "@/components/ui/LineCustom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import {addToCartAPI, getToCartAPI} from "@/util/api/apiReuqest";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {CartDTO} from "@/types";

interface CartProps {
    toggleCart: () => void;
}

//bang

const CartComponent: FC<CartProps> = ({toggleCart}) => {
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [CartData,setCartData] = React.useState<CartDTO>()
    const { data: cartData, isLoading, isError,isSuccess } = useQuery(['cart', userId], () =>
        getToCartAPI(accessToken, userId)
    );
    const [cart, setCart] = React.useState<CartDTO[]>();

    React.useEffect(() => {
        if (isSuccess) {
            setCart(cartData);
        }
    }, [isSuccess, cartData]);
    const queryClient = useQueryClient();

    const addToCartMutation = useMutation((tourId) => addToCartAPI(accessToken, userId, tourId), {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', userId]);
        },
    });
    console.log(cart);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const optionsMoney:Intl.NumberFormatOptions  =
    {style: 'currency', currency: 'VND'}
    return (
        <section className={'absolute opacity-95 top-[100%] z-[1300] right-0 w-[100%] nh:w-[40%] nh:right-[5%]'}>
            <Card
                variant="outlined"
                sx={{
                    maxHeight: 'max-content',
                    width: '100%',
                    borderRadius: '10px',
                    // mx: 'auto',
                    padding: '1rem',
                    backgroundColor: '#c0c0c0',
                    height: {xs: '100vh', md: '40vh'},
                    overflow: 'auto',
                    resize: 'none',
                    paddingBottom: '12px',
                }}
            >
                <div className={'flex justify-between mb-4'}>
                    <Paragraph size={'md'} className={'text-white font-bold'}>
                        <ShoppingCartIcon sx={{fontSize: '2rem'}}/>
                    </Paragraph>
                    <CloseIcon sx={{color: 'white', fontSize: '2rem'}} onClick={toggleCart}/>
                </div>
                <div className={'w-full flex justify-center mb-4'}>
                    <div style={{backgroundColor: 'black', width: `100%`, height: '1px'}}></div>
                </div>
                <div className={'overflow-hidden'}>
                    <table className="table-fixed min-w-full text-left text-[12px]">
                        <thead>
                        <tr className={'text-left'}>
                            <th scope="col" className="px-2">Name</th>
                            <th scope="col" className="px-2">Start Day</th>
                            <th scope="col" className="px-2">Price</th>
                            <th scope="col" className="px-2">Booking</th>
                            <th scope="col" className="px-2">Remove</th>
                        </tr>
                        </thead>
                        {isLoading ?  <div className={'flex justify-center w-screen items-center absolute z-100 h-screen bg-light'}>
                            <CircularProgress color="secondary"/>
                        </div> : (
                            <tbody className={'text-white'}>
                            {cart && cart?.map((item)=>{
                                const startDate = new Date(item.tour.startDate)
                                const formatDate =  startDate.toLocaleDateString('es-uk',options)
                                const formatPrice =  item.tour.price.toLocaleString('vi-VN',optionsMoney)
                                return(
                                <tr key={item.id}>
                                    <td className={'px-2 pb-2'}>{item.tour.name}</td>
                                    <td className={'px-2'}>{formatDate}</td>
                                    <td className={'px-2'}>{formatPrice}</td>
                                    <td className={'px-2'}>
                                        <div className="flex justify-center">
                                            <InventoryOutlinedIcon
                                                sx={{
                                                    fontSize: '18px',
                                                    color: 'black',
                                                    transition: 'color 0.3s',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: 'blue',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className={'px-2'}>
                                        <div className="flex justify-center">
                                            <DeleteOutlinedIcon sx={{
                                                fontSize: '18px',
                                                color: 'black',
                                                transition: 'color 0.3s',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: 'red',
                                                },
                                            }}/>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                            </tbody>
                        )
                        }
                    </table>
                </div>
            </Card>
        </section>
    );
}
export default CartComponent;