import { BusinessCard } from './types';
import axios, { AxiosRequestConfig } from "axios"
import { LoginField, UserCard } from "../utils/types"
import { getData } from './localStorage';

const url = 'http://localhost:8000'
const config: AxiosRequestConfig = {
    headers: {
        'Authorization': getData('user', 'token'),
        'Content-Type': 'application/json',
    },
};

// userApi

export function registerUser(form: UserCard) {
    return axios.post(`${url}/user/register`, form)
}

export function loginUser(form: LoginField) {
    return axios.post(`${url}/user/login`, form)
}
export function deleteUser(id: string) {
    return axios.delete(`${url}/user/${id}`)
}

// BusinessApi

export function addCard(form: BusinessCard) {
    return axios.post(`${url}/business`, form, config)
}
