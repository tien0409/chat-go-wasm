import { TEXT_TYPE } from '../configs/consts'

interface IMessage {
  content: string
  index?: number
  type?: typeof TEXT_TYPE
  sender: string
}

export default IMessage
