import palolemVideo from '../../../../assets/PalolemVideo.mp4'
import agondaVideo from '../../../../assets/AgondaVideo.mp4'
import HomeVideo from '../../../../assets/HomeVideo.mp4'

const ResortVideo = ({ resortname }) => {
    { console.log(resortname) }
    return (
        <div className="main">
            {resortname == 'Palolem Beach Resort' ?
                < video src={palolemVideo} autoPlay muted loop />
                :
                null}
            {resortname == 'Cuba Agonda' ?
                < video src={agondaVideo} autoPlay muted loop />
                :
                null}
            {resortname == 'Cuba Patnem' ? 
                < video src={HomeVideo} autoPlay muted loop />
                :
                null}
        </div>
    )
}

export default ResortVideo