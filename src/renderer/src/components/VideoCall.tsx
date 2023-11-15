import { useRef } from 'react'
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react'
import useCallStore from '../stores/useCallStore'

const VideoCall = () => {
  const { enableVideo, enableAudio, setEnableVideo, setEnableAudio, turnOffCall } = useCallStore()

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const localStream = false
  const remoteStream = false

  return (
    <div className="flex items-center justify-center h-full">
      {remoteStream ? (
        <video ref={remoteVideoRef} />
      ) : (
        <img
          alt="avatar"
          src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
          className="w-36 h-36 bg-blue-500 rounded-full"
        />
      )}

      <div className="absolute z-10 bottom-10 left-1/2 flex gap-x-5">
        <span className="cursor-pointer" onClick={() => setEnableAudio(!enableAudio)}>
          {enableAudio ? <Mic size={30} /> : <MicOff size={30} />}
        </span>
        <span className="cursor-pointer" onClick={() => setEnableVideo(!enableVideo)}>
          {enableVideo ? <Video size={30} /> : <VideoOff size={30} />}
        </span>
        <Phone className="cursor-pointer" size={30} onClick={() => turnOffCall()} />
      </div>

      <div className="absolute bottom-4 right-4 w-72 rounded h-44 bg-red-500 flex items-center justify-center">
        {localStream ? (
          <video ref={localVideoRef} />
        ) : (
          <img
            alt="avatar"
            src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
            className="w-16 h-16 rounded-full"
          />
        )}
      </div>
    </div>
  )
}

export default VideoCall
