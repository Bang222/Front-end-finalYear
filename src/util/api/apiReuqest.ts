import {CommentsDTO, commentsDTO, LoginDTO, RegisterDTO, UserDTO, UserRequestDTO, voteDTO} from "@/types";
import axios from "axios";
import {endPointAPI} from "../../../constants";
import {TourDTO} from "@/types/tourDTO";
import {useQuery} from "@tanstack/react-query";
import {getCookie} from "@/util/api/cookies";

export const loginAPI = async (loginDTO: LoginDTO): Promise<UserRequestDTO> => {
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login', loginDTO)
        if (!res.data) {
            throw new Error("can not find user");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('Login Failed');
    }
}
export const RegisterApi = async (registerDTO: RegisterDTO) => {
    try {
        return await axios.post('http://localhost:4000/api/auth/register', registerDTO)
    } catch(e) {
        throw new Error('Email Registered')
    }
}
export const useGetAllTourApi = () => {
    try {
        return useQuery<TourDTO[],Error>({
            queryKey:['All-Tour'],
            queryFn: async () => {
                const data = await axios.get('http://localhost:4000/api/tour/all')
                return data.data as TourDTO[]
            },
            cacheTime: 5000
        })
    } catch(e) {
        throw new Error(e)
    }
}
export const upVoteTourApi = async (tourId: string) => {
    try {
        const res = await axios.post('http://localhost:4000/api/tour/upvote', {tourId: tourId} , {
            headers: {Authorization: `bearer ${getCookie('token')}`}
        })
        if (!res.data) {
            throw new Error("can not find tour");
        }
        const data = res.data;
        return data as voteDTO
    } catch (err) {
        throw new Error('Email or password wrong');
    }
}
export const getCommentsOfTour = async (tourId: string) => {
    try {
        const res = await axios.post('http://localhost:4000/api/tour/comments', {tourId: tourId})
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const postCommentsOfTour = async (commentDTO :CommentsDTO) => {
    try {
        const token = getCookie('token')
        const res = await axios.post('http://localhost:4000/api/tour/create/comment',commentDTO , {
            headers: {Authorization : `Bearer ${token}`}
        })
        if (!res.data) {
            throw new Error("can not found");
        }
        const data = res.data;
        return data
    } catch (err) {
        throw new Error('sorry can not find comments');
    }
}
export const useGetWeather = () => {
    try{
    // const api = {
    //     key: "05e07e9af78ffd8691289b6165e7423a",
    //     base: "https://api.openweathermap.org/data/2.5/",
    // };
        return useQuery({
            queryKey: ['weather'],
            queryFn: async () => {
                const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=DaNang&units=metric&APPID=05e07e9af78ffd8691289b6165e7423a')
                return data.data
            },
            cacheTime: 1000
        })
    }catch (err) {
        console.log('sorry Weather Data not found');
    }
}
