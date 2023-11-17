import clsx from 'clsx'
import { ChevronLeft, ChevronRight, Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useCallStore from '../stores/useCallStore'

const VideoCall = () => {
  const { enableVideo, enableAudio, setEnableVideo, setEnableAudio, turnOffCall } = useCallStore()

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [isHiddenLocalStream, setIsHiddenLocalStream] = useState(false)

  const localStream = true
  const remoteStream = true

  const handleVideo = () => {
    const All_mediaDevices = navigator.mediaDevices
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log('getUserMedia() not supported.')
      return
    }
    All_mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
      .then(function (vidStream) {
        /* const recorder = new MediaRecorder(vidStream);
        recorder.ondataavailable = event => {
          // get the Blob from the event
          const blob = event.data;
          blob.stream().getReader().read().then(
            value => {
              var binary = '';
              var u8 = value.value;
              var len = u8.byteLength;
              for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(u8[i]);
              }
              console.log(window.btoa(binary))
            }
          )

          // and send that blob to the server...
        };
        recorder.start(1000) */

        const video = localVideoRef.current
        if (video != null) {
          if ('srcObject' in video) {
            video.srcObject = vidStream
          } else {
            video.src = window.URL.createObjectURL(vidStream)
          }
          video.onloadedmetadata = function (e) {
            video.play()
          }
        }
      })
      .catch(function (e) {
        console.log(e.name + ': ' + e.message)
      })
  }

  useEffect(() => {
    handleVideo()
  }, [])

  return (
    <div className="flex items-center justify-center h-full w-full">
      {remoteStream ? (
        <video ref={localVideoRef} className="block items-center justify-center h-full w-full" />
      ) : (
        <img
          alt="avatar"
          src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
          className="w-36 h-36 bg-blue-500 rounded-full object-cover"
        />
      )}

      <div className="absolute z-10 bottom-10 left-1/2 flex gap-x-8 -translate-x-1/2">
        <span className="cursor-pointer" onClick={() => setEnableAudio(!enableAudio)}>
          {enableAudio ? <Mic size={30} /> : <MicOff size={30} />}
        </span>
        <span className="cursor-pointer" onClick={() => setEnableVideo(!enableVideo)}>
          {enableVideo ? <Video size={30} /> : <VideoOff size={30} />}
        </span>
        <Phone className="cursor-pointer" size={30} onClick={() => turnOffCall()} />
      </div>

      <ChevronLeft
        size={36}
        className={clsx(
          'absolute bottom-16 cursor-pointer opacity-0 duration-1000 right-4',
          isHiddenLocalStream ? 'opacity-100' : 'invisible'
        )}
        onClick={() => setIsHiddenLocalStream(false)}
      />

      <div
        className={clsx(
          'group absolute duration-300 bottom-4 w-72 rounded h-44 bg-gray-800 flex items-center justify-center',
          isHiddenLocalStream ? 'translate-x-full right-0' : 'translate-x-0 right-4'
        )}
      >
        {localStream ? (
          <video ref={localVideoRef} className="absolute rounded h-44 w-72" />
        ) : (
          <img
            alt="avatar"
            src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div className="group-hover:opacity-100 absolute right-0 px-2 inset-y-0 flex items-center bg-transparent hover:bg-black/10 duration-300 opacity-0 cursor-pointer">
          <ChevronRight className="text-white" onClick={() => setIsHiddenLocalStream(true)} />
        </div>
      </div>
    </div>
  )
}

export default VideoCall
