import { ChangeEvent, useContext, useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCards } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/helpers";
import { getData } from "../utils/localStorage";
import { BusinessContext } from "../context/Business";
import { log } from "console";


export function useData() {
    // const navigate = useNavigate()
    const { business } = useContext(BusinessContext)
    const [data, setData] = useState<BusinessCard[]>([])

    function addData(data: BusinessCard) {
        setData((currentData) => [...currentData, data])
    }

    function deleteData(id: string) {
        setData((currentData) => currentData.filter((data) => data._id !== id))
    }

    function editData(id: string, data: BusinessCard) {
        setData((currentData) => currentData.map((card) => {
            return card._id === id ? data : card
        }))
    }

    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setData((currentCards: BusinessCard[]) => {
                return currentCards.filter((card: BusinessCard) => {
                    return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
                })
            })
        }
        else {
            getCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
                .catch(e => toast.warning(e.response.data))
        }
    }

    useEffect(() => {
        if (getData('user', 'business')) {
            getCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
                .catch(e => {
                    toast.warning(e.response.data)
                    // logout(navigate)
                })
        }
    }, [business])

    return { data, deleteData, addData, editData, searchData }
}