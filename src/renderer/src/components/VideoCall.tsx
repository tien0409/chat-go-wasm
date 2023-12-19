import clsx from 'clsx'
import { ChevronLeft, ChevronRight, Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useCallStore from '../stores/useCallStore'
import { decryptblobBrowser, encryptblobBrowser } from '../crypto/cryptoLib'

const VideoCall = () => {
  const { enableVideo, enableAudio, setEnableVideo, setEnableAudio, turnOffCall } = useCallStore()

  const VOIP_TOKEN = 'LbqxmXO6ardFW_xPMOaUjUObwnGWAE9gGU0Vm2cb9Ks'
  const ENCRYPT_KEY = 'e/cyuqcGcTgF5Q2VzB1iTw=='
  const requestTemplate = 'ws://127.0.0.1:7777/voip?voipSession={{voipToken}}&connType={{connType}}'

  const senderWs = new WebSocket(
    requestTemplate.replace('{{voipToken}}', VOIP_TOKEN).replace('{{connType}}', 'FROM_CALLER')
  )

  const recieverWs = new WebSocket(
    requestTemplate.replace('{{voipToken}}', VOIP_TOKEN).replace('{{connType}}', 'FROM_RECIEVER')
  )

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [isHiddenLocalStream, setIsHiddenLocalStream] = useState(false)

  const localStream = true
  const remoteStream = true
  let localRecorder: MediaRecorder

  // LOCAL
  const All_mediaDevices = navigator.mediaDevices
  if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
    console.log('getUserMedia() not supported.')
    return
  }

  // REMOTE
  const remoteMediaSource = new MediaSource()
  const remoteArrayBuffer: ArrayBuffer[] = []
  let remoteSrcBuffer: SourceBuffer

  useEffect(() => {
    senderWs.onopen = () => {
      console.log('SenderVOIP Connected')
    }
    recieverWs.onopen = () => {
      console.log('RecieverVOIP VOIP Connected')
    }

    // LOCAL setup
    // All_mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true
    // })
    //   .then(function (vidStream) {
    //     if (localRecorder == null) {
    //       localRecorder = new MediaRecorder(vidStream, {
    //         mimeType: 'video/webm; codecs="opus,vp8"'
    //       })
    //       localRecorder.ondataavailable = (event) => {
    //         encryptblobBrowser(event.data, ENCRYPT_KEY).then((result) => {
    //           senderWs.send(result)
    //         })
    //       }
    //       localRecorder.start(100)
    //     }
    //     const video = localVideoRef.current
    //     if (video != null) {
    //       video.muted = true
    //       video.srcObject = vidStream
    //       video.onloadedmetadata = function () {
    //         video.play()
    //       }
    //     }
    //   })
    //   .catch(function (e) {
    //     console.log(e.name + ': ' + e.message)
    //   })
    //
    // // REMOTE setup
    // remoteMediaSource.addEventListener('sourceopen', () => {
    //   if (
    //     !remoteMediaSource.readyState.localeCompare('open') &&
    //     remoteMediaSource.sourceBuffers.length == 0
    //   ) {
    //     remoteSrcBuffer = remoteMediaSource.addSourceBuffer('video/webm; codecs="opus,vp8"')
    //     remoteSrcBuffer.addEventListener('updateend', () => {
    //       if (remoteVideoRef.current != null) {
    //         remoteVideoRef.current.play()
    //       }
    //     })
    //   }
    // })
    //
    // // WS handler
    // if (remoteVideoRef.current != null) {
    //   remoteVideoRef.current.src = window.URL.createObjectURL(remoteMediaSource)
    // }
    // recieverWs.onmessage = (msg) => {
    //   const blob = new Blob([msg.data], {
    //     type: 'video/webm; codecs="opus,vp8"'
    //   })
    //   decryptblobBrowser(blob, ENCRYPT_KEY).then((result) => {
    //     result
    //       .slice(0, result.size)
    //       .arrayBuffer()
    //       .then((data) => {
    //         remoteArrayBuffer.push(data)
    //         if (
    //           remoteMediaSource.readyState === 'open' &&
    //           remoteSrcBuffer &&
    //           remoteSrcBuffer.updating === false
    //         ) {
    //           const blob = remoteArrayBuffer.shift()
    //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //           // @ts-ignore
    //           remoteSrcBuffer.appendBuffer(blob)
    //           if (remoteVideoRef.current != null) {
    //             if (
    //               remoteVideoRef.current.buffered.length &&
    //               remoteVideoRef.current.buffered.end(0) -
    //                 remoteVideoRef.current.buffered.start(0) >
    //                 400
    //             ) {
    //               remoteSrcBuffer.remove(0, remoteVideoRef.current.buffered.end(0) - 400)
    //             }
    //           }
    //         }
    //       })
    //   })
    // }
  }, [])

  return (
    <div className="flex items-center justify-center h-full w-full">
      {remoteStream ? (
        <video ref={remoteVideoRef} className="block items-center justify-center h-full w-full" />
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
