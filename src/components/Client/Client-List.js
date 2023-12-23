import { useEffect, useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import axios from '../../helpers/axios'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const ClientList = () => {
    const navigate = useNavigate()
    const [allClients, setAllClients] = useState();
    const fetchAllClients = () => {
        axios.get('/get-all-clients')
            .then((res) => {
                setAllClients(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
 
    console.log(allClients)
    useEffect(() => {
        fetchAllClients();
    }, [])

    if(!allClients){
        return(
            <h1>
                Loading . . .
            </h1>
        )
    }
    return (
        <>
            <Header />
            <div style={{ marginTop: '7rem' }}>
                <CTable responsive>
                    <CTableHead color="dark" >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Client Contact</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Client Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Booking History</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {allClients.map((client, index) => {
                            return (
                                <>
                                    <CTableRow key={client._id}>
                                        <CTableDataCell>{client?.name}</CTableDataCell>
                                        <CTableDataCell>{client?.contact}</CTableDataCell>
                                        <CTableDataCell>{client?.email}</CTableDataCell>
                                        <CTableDataCell>
                                            <button className="view-booking-show-btn">
                                                Show
                                            </button>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <div>
                                        <button
                                            onClick={() => {}}
                                        >Block</button>
                                    </div>
                                </>
                            )
                        })}
                    </CTableBody>
                </CTable>
            </div>
        </>
    )
}

export default ClientList