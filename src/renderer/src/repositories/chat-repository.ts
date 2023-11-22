import axiosInstance from '../libs/axios'
import IChatSessionInit from '../interfaces/IChatSessionInit'

const chatRepository = {
  initChatSession: (body: IChatSessionInit) => axiosInstance.post('/chatSession/init', body),
  getPendingChatSession: () => axiosInstance.get('/chatSession'),
  getPendingChatMessage: () => axiosInstance.get('/message?chatSessionId')
}

export default chatRepository
