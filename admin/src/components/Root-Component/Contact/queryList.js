import { useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import './queryList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ViewQuery from './viewQuery';

const ContactUsList = ({ queryList, setQueryList }) => {
    const [query, setQuery] = useState("")
    // console.log('querylist => ', queryList)
    const [showQueryModel, setShowQueryModal] = useState(false)
    const viewQueryDetails = (details) => {
        setShowQueryModal(true)
        setQuery(details)
        console.log(details);
    }

    return (
        <>
            <ToastContainer
                autoClose={1500}
                limit={5}
                theme={"dark"}
                pauseOnFocusLoss={false}
                position={"bottom-center"}
            />
            <CTable responsive style={{ marginTop: '3rem' }}>
                <CTableHead color="dark" >
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Contact</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Organization</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {queryList?.map((item, index) => {
                        return (
                            <>
                                <CTableRow color="light" key={queryList._id}>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.firstName + " " + item.lastName}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.email}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.contact}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.yourOrganization ? item?.yourOrganization : "----"}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>
                                        <button className="view-query-details" onClick={() => viewQueryDetails(item)}>
                                            View
                                        </button>
                                    </CTableDataCell>
                                </CTableRow>
                            </>
                        )
                    })}
                </CTableBody>
            </CTable>
            <ViewQuery query={query} setQuery={setQuery} viewQueryDetails={viewQueryDetails} showQueryModel={showQueryModel} setShowQueryModal={setShowQueryModal} />
        </>
    )
}

export default ContactUsList;