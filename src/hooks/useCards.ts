import { BusinessCard } from './../utils/types';
import { ChangeEvent, useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { getData, setData } from "../utils/localStorage";

export default function useCards() {
    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards: BusinessCard[] = getData("defaultCards")
        const appReset: boolean = getData("appReset")

        if (!storedCards || !appReset) {
            localStorage.clear()
            return defaultCards;
        }
        return storedCards;
    });

    function cardsFiltered() {
        const removedCards = getData('removedCards')
        if (removedCards) {
            return defaultCards.filter(card => {
                return !removedCards.some((removeCard: BusinessCard) => removeCard.email === card.email)
            })
        }
        return defaultCards
    }

    const searchDefaultCards = (e: ChangeEvent<HTMLInputElement>) => {
        setCards((currentCards: BusinessCard[]) => {
            const filteredCards = currentCards.filter((card: BusinessCard) => {
                return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            })
            return e.target.value === "" ? cardsFiltered() : filteredCards
        })
    }

    useEffect(() => {
        setData("defaultCards", cards)
        setData("appReset", true)
    }, [cards]);

    return { cards, setCards, searchDefaultCards };
}



