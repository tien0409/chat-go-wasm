import clsx from 'clsx'
import { memo } from 'react'
import useConversationStore from '../stores/useConversationStore'
import IConversation from '../interfaces/IConversation'
import chatRepository from '../repositories/chat-repository'

type ConversationItemProps = {
  conversation: IConversation
}

const ConversationItem = (props: ConversationItemProps) => {
  const { conversation } = props

  const currentConversation = useConversationStore((state) => state.currentConversation)
  const setCurrentConversation = useConversationStore((state) => state.setCurrentConversation)

  const handleSelectConversation = async () => {
    try {
      setCurrentConversation(conversation.id)
      await window.startUp('1234')
      const res = await window.initRatchetFromInternal(
        '{\n' +
          '    "identityKey": "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEP3SGt_4bDdxyZYAj-UKCOvzq0P2nVMKaDJkl-ySW3prWvHtcgvxud7_ftj4LhQgBo3a89poHSRSD-v0TRcbVcYoMg1bOkFm-OU7c-46nd4-eCt_0YJOKbb_L_O9p6vDi",\n' +
          '    "preKey": "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEZakQDuZvQ8TbxIL-dLlHfa2wTiE767quK20B2XeAPAHcOeueWQMHQWdFjMEI982iS2u_Idyl5lvfoR6HBH0OkrbB0_t5ZNGAor0uZmYgTu1iKL_IuJrplnIJQKomzwch",\n' +
          '    "preKeySig": "MGUCMCBSp9FNciMC7SdofvFnsggcAFzeB6jemvC6ZT5W2en3F2eI3oO65ektZfVDAtzH7AIxAPdVK5bqpPCHw4J0PMFpKxpytLF7xCyauvk7s6Q1sVufOCC9yIhsEommKG_ttx9XGg",\n' +
          '    "oneTimeKeyId": "374a8636-8956-11ee-a65a-2e3b7058e381",\n' +
          '    "oneTimeKey": "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEe6y7Qw_DL86dW5NW53wGkDvgYgP3KnFQT9-nTvIFjnKFk7YiZq19POAwGvp6uOSAvHA7SRvOHHffbhHo29IK17FhLZWJT_ZdqC9W_xkgtcRwSAQVbKag43I3pUpTHNxp",\n' +
          '    "oneTimeKeySig": "MGUCMQD81fFoH6swwbZlV7zTKsLug2eepGi06RgWhJFoJ-c-ZL5bvUHwjn6AFxXycANYTV4CMAurS7W3jRpP7vUnCQPrAASBcoq43Inh4-tViWBFLJnogqMRkBf_eyh2aZVkbHGcpg"\n' +
          '}'
      )
      console.log('res', res)
      const res2 = await chatRepository.initChatSession({
        chatSessionId: res.ratchetId,
        ephemeralKey: res.ephemeralKey,
        receiverUserName: 'tien1'
      })
      console.log('res2', res2)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  return (
    <div
      className={clsx(
        'border-b cursor-pointer flex gap-x-3 justify-between hover:bg-black/10 w-full p-3 items-center',
        currentConversation === conversation.id && 'bg-yellow-50/80'
      )}
      onClick={handleSelectConversation}
    >
      <div className="flex gap-2 items-center flex-1 ">
        <img
          src="https://source.unsplash.com/RZrIJ8C0860"
          alt="image"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col overflow-hidden">
          <h4 className="font-semibold text-sm">{conversation.receiver}</h4>
          <p className="line-clamp-1 text-xs text-gray-400">{conversation.lastMessage}</p>
        </div>
      </div>

      <span className="w-2 h-2 rounded-full bg-green-500"></span>
    </div>
  )
}

export default memo(ConversationItem)
