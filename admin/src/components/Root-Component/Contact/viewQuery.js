import axios from '../../../helpers/axios'
import {
    CButton, CModal, CModalHeader,
    CModalTitle, CModalBody, CRow,
} from '@coreui/react'
import swal from 'sweetalert';

const ViewQuery = ({ query, setQuery, showQueryModel, setShowQueryModal }) => {
    const token = localStorage.getItem('token')
    const acknowledgeQuery = async () => {
        await axios.post('query-acknowledgement-mail', query, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                // console.log(res)
                // console.log(res.data.message)
                setShowQueryModal(false)
                if (res.data.message == 'success') {
                    swal({
                        title: "Good job!",
                        text: "Acknowledgent mail sent successfully!",
                        icon: "success",
                        button: "OK!",
                    });
                }
                setShowQueryModal(false)
            })
            .catch((err) => {
                console.log(err)
                setShowQueryModal(false)
                alert('please try after some time !')
            })
    }
    return (
        <CModal
            keyboard={false}
            portal={false}
            visible={showQueryModel}
            style={{ marginTop: '10rem' }}
            className='booking-form-p ' scrollable size='lg'
        >
            <CModalHeader onClick={() => { setShowQueryModal(false) }} className="mb-2">
                <CModalTitle><h5>Message</h5></CModalTitle>
            </CModalHeader>
            <CModalBody >
                <CRow className="mb-4">
                    {query.message}
                </CRow>
                <CRow>
                    <CButton onClick={acknowledgeQuery}>
                        Acknowledge
                    </CButton>
                </CRow>
            </CModalBody>
        </CModal>
    )
}

export default ViewQuery