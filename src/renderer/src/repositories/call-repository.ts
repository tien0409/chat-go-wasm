import axiosInstance from '../libs/axios'
import { CHAT_AUDIO_EVENT, CHAT_VIDEO_EVENT } from '../configs/consts'

const callRepository = {
  initVOIP: (
    username: string,
    callType: typeof CHAT_VIDEO_EVENT | typeof CHAT_AUDIO_EVENT,
    ephemeralKey: string
  ) =>
    axiosInstance.put(
      `/voip/init?userId=${username}&callType=${callType}&ephemeralKey=${ephemeralKey}`
    )
}

export default callRepository
