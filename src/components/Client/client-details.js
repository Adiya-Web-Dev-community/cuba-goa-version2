import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../helpers/axios'
import Header from "../Header/Header";

const ClientDetails = () => {
    const [clientDetail, setClientDetail] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.clientId;

    const fetchClientDetail = async () => {
        await axios.get(`/get-client-details/${userId}`)
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchClientDetail()
    }, [])
    console.log(userId)
    return (
        <>
            <Header />
            <div style={{ marginTop: '7rem' }}>
                Client
            </div>
        </>
    )
}

export default ClientDetails;