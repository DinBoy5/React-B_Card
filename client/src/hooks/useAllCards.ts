import React, { useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getAllCards } from "../utils/services";
import { LoginInfoContext } from "../context/LoginInfo";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../utils/helpers";
import { AxiosResponse } from "axios";

export function useAllCards() {
    const { setLoginInfo, loginInfo } = React.useContext(LoginInfoContext)
    const [allCards, setAllCards] = useState<BusinessCard[]>([])
    const { logged } = loginInfo
    const navigate = useNavigate()
    let error = 0

    function addCardToAll(data: BusinessCard) {
        setAllCards((currentData) => [...currentData, data])
    }

    useEffect(() => {
        if (logged && !error) {
            error += 1
            getAllCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setAllCards(res.data))
                .catch((e) => errorMsg(e, navigate, setLoginInfo, true))
        }
    }, [logged]);

    return { allCards, addCardToAll }
}

