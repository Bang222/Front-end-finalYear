'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommentIcon from '@mui/icons-material/Comment';
import {styled} from '@mui/material/styles';
import {NextPage} from "next";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Paragraph from "@/components/ui/Paragraph";
import CardActions from "@mui/material/CardActions";
import ClearIcon from '@mui/icons-material/Clear';
import {Tooltip} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAxios, getCommentsOfTour, postCommentsOfTour} from "@/util/api/apiReuqest";
import {useEffect, useMemo, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {CommentsDTO, CommentTourDTO} from "@/types";
import CommentOfTour from "@/components/user/commentOfTour";
import {useUserDetailAPI} from "@/util/api/auth";
import {useDispatch, useSelector} from "react-redux";
import Slice from "@/components/ui/swiperSlice";
import {AppDispatch} from "@/redux/store";
import {toast} from "react-toastify";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const CustomButton = styled(Button)({
    color: 'black',
    '&:hover': {
        backgroundColor: '#D3D3D3',
        color: 'blue'
    },
});

export interface props {
    id: string;
    name: string;
    imageUrl: string[];
    comments: number;
    createdAt: Date;
    store: {
        id: string;
        name: string;
        slogan: string;
        isActive: boolean;
    }
    commentData: CommentTourDTO[] | undefined;
    setCommentData: React.Dispatch<React.SetStateAction<CommentTourDTO[] | undefined>>;
}

const ModalCommentOfTour: React.FC<props> = ({...props}) => {
    const user = useSelector((state) => state.auth.value?.user)
    const accessToken = useSelector((state) => state.auth.value?.token.access)
    const userId = useSelector((state) => state.auth.value?.user.id)
    const [commentsError, setCommentsError] = useState<string>("");
    const [commentsSuccess, setCommentsSuccess] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const queryClient = useQueryClient()
    const dispatch = useDispatch<AppDispatch>()
    const dataRedux = useSelector((state) => state.auth?.value)
    let axiosJWT = createAxios(dataRedux,dispatch)

    const {mutate, isLoading, data } = useMutation(async (tourId:string)=>{
        try {
            const res = await getCommentsOfTour(tourId, axiosJWT)
            return res
        } catch(e){
            toast.error('can not comment')
        }
    }, {
        onSuccess: (data) => {
            setCommentsError('')
            props.setCommentData(data)
        },
        onError: (error) => {
            setCommentsError(error.message);
            setCommentsSuccess('');
        },
    })

    const {mutate: mutateComment, data: dataComment} = useMutation(
        async (commentData:CommentsDTO) => {
            try {
                const res = await postCommentsOfTour(commentData,userId,accessToken,axiosJWT)
                return res
            }catch(error){
                throw error;
            }
        },
        {
        onSuccess: (dataComment) => {
            props.setCommentData([...props.commentData,dataComment])
            // queryClient.invalidateQueries(['All-Tour'])

        },
        onError: (error) => {
            setCommentError(error.message);
        }
    })
    const handleClickTurnOffModal = () => {
        setOpen(false)
    }
    const handleClickComments = (tourId: string) => {
        mutate(tourId)
    }
    const [commentError, setCommentError] = useState("");
    const [content, setContent] = React.useState<string>()
    const handleClickSendComment = (e) => {
        if (!content?.trim()) return;
        const commentData = {
            tourId: props.id,
            content: content
        }
        mutateComment(commentData as CommentsDTO)
        setContent('')
    }
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const createdAt = new Date(props.createdAt);
    const formattedCreateAt = createdAt.toLocaleDateString('es-uk',options)
    return (
        <div className=''>
            <Tooltip title="comment" placement="top" sx={{color: 'black'}}>
            <CustomButton onClick={handleOpen}><CommentIcon/></CustomButton>
            </Tooltip>
            <Modal
                sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center',marginTop: {xs:"150px",lg:"auto"}}}
                disableEnforceFocus={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{
                    height: {xs: 'fit-content', md: '90%'},
                    maxHeight: {xs: '70%'},
                    width: {xs: '80vw', lg: '50vw'},
                    marginTop: '48px',
                    marginBottom: '48px',
                    overflowY: 'scroll',
                    position: 'relative',
                    // paddingBottom: props.comments > 1 ? '60px' : '50px'
                }}>
                    <CardHeader
                        //src={} alt={}
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton sx={{fontSize: '30px'}} aria-label="settings" onClick={handleClickTurnOffModal}>
                                <ClearIcon/>
                            </IconButton>
                        }
                        title={props.store.name}
                        subheader={formattedCreateAt}
                    />
                    <CardContent sx={{padding:0}}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <section className={'mb-4'}>
                            <Slice previewImage ={props.imageUrl}  />
                        </section>
                        <div className={'grid grid-flow-col justify-stretch px-3'}>
                            <div>
                                <Paragraph size={"sm"}><b>Name: </b>{props.name}</Paragraph>
                            </div>
                            <div className={'grid lg:flex items-end justify-center lg:justify-end pb-[10px]'}>
                            </div>
                        </div>
                    </CardContent>
                    <div className={'w-full flex justify-center'}>
                        <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
                    </div>
                    <CardActions sx={{width: '100%'}}>
                        <Box sx={{display: 'flex',marginLeft:"40px", width: '100%'}}>
                            <Typography sx={{display: 'flex'}}>
                                <Tooltip title="comment" placement="top" sx={{
                                    color: 'black', cursor: 'pointer', '&:hover': {
                                        backgroundColor: '#D3D3D3',
                                        color: 'blue'
                                    },
                                }} onClick={(e) => handleClickComments(props.id)}>
                                    <CommentIcon/>
                                </Tooltip>
                                <Paragraph className={"ml-[12px]"}>{ props.commentData?.length }</Paragraph>
                            </Typography>
                        </Box>
                    </CardActions>
                    <div className={'w-full flex justify-center'}>
                        <div style={{backgroundColor: '#A9A9A9', width: '90%', height: '1px'}}></div>
                    </div>
                    <CardContent>
                        {isLoading ? <Paragraph>Loading...</Paragraph> : <>
                            {props.commentData && props.commentData?.map((comment: CommentTourDTO) => {
                                return (
                                    <section className={'flex pt-2 pb-2'} key={comment.id}>
                                        <CommentOfTour
                                            user ={comment.user}
                                            tourId={comment.tourId}
                                            id={comment.id}
                                            content = {comment.content}
                                        />
                                    </section>
                                )
                            })}
                        </>}
                    </CardContent>
                    <CardContent sx={{
                        position: 'sticky',
                        bottom:0,
                        zIndex:"99999",
                        paddingTop: 0,
                        paddingBottom: '0!important',
                        // bottom: {xs: props.comments >= 1 ? '15%' : '15%',md: props.comments >= 1 ? '15%' : '15%'},
                        backgroundColor: '#B8B8B8',
                        margin: '0',
                        width: {xs: '80vw', lg: '50vw'}
                    }}>
                        <section className={'flex items-center'}>
                            <CardHeader sx={{paddingRight: 0, paddingLeft: 0}}
                                        avatar={
                                            <Avatar sx={{bgcolor: red[500]}} src={user.profilePicture} alt={'user'}
                                                    aria-label="recipe">
                                            </Avatar>
                                        }
                            ></CardHeader>
                            <div className={' flex justify-center items-center w-[65%] md:w-[80%]'}>
                                <textarea type='text'
                                          placeholder='comment'
                                          name='content'
                                          id="content"
                                          className={'flex-1 h-10 p-2 resize-none rounded-lg focus:outline-none  '}
                                          value={content}
                                          onChange={handleContentChange}
                                />
                            </div>
                            <div className={'pl-3.5'}>
                                <Tooltip title="comment" placement="top" sx={{
                                    color: 'grey', cursor: 'pointer', '&:hover': {
                                        color: 'blue'
                                    },
                                    fontSize: '20px'
                                }} onClick={(e)=>handleClickSendComment(e)}>
                                    <SendIcon/>
                                </Tooltip>
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
}
export default ModalCommentOfTour
