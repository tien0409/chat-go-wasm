import { FILE_TYPE, TEXT_TYPE } from '../configs/consts'

interface IMessage {
  content: string
  index?: number
  type?: typeof TEXT_TYPE | typeof FILE_TYPE
  filePath?: string
  sender: string
}

export default IMessage
