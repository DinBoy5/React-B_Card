import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/services";
import { LoginField } from "../utils/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function useFields(initalValue: LoginField) {

    const navigate = useNavigate()
    const [fields, setFields] = useState(initalValue)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields((currentValue) => {
            return { ...currentValue, [name]: value }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginUser(fields)
            .then(() => navigate('/'))
            .catch(e => toast.error(e.response.data))
    }

    const resetFields = () => {
        setFields(initalValue)
    }

    return { fields, handleField, handleSubmit, resetFields }
}