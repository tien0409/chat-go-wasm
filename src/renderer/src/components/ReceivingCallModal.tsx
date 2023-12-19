import { AVATAR_DEFAULT } from '../configs/consts'
import useCallStore from '../stores/useCallStore'
import { Phone, X } from 'lucide-react'

type ReceivingCallModalProps = {
  setCallModal: (value: boolean) => void
}

const ReceivingCallModal = (props: ReceivingCallModalProps) => {
  const { setCallModal } = props

  const { typeCall } = useCallStore()

  return (
    <div className="absolute inset-0">
      <span className="absolute inset-0 bg-black/30" onClick={() => setCallModal(false)}></span>
      <div className="relative top-20 left-1/2 -translate-x-1/2">
        <div>
          <img src={AVATAR_DEFAULT} />
        </div>
        <p>
          <span className="font-medium">LeAnhTien </span>
          <span>muốn gọi {typeCall === 'video' ? 'video' : ''} cho bạn</span>
        </p>

        <ul className="flex justify-center items-center gap-5 list-none mb-0">
          <li>
            <Phone color={'#fff'} />
          </li>

          <li>
            <X color={'#fff'} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ReceivingCallModal
