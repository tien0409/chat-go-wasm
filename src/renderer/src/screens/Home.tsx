import clsx from 'clsx'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import useCallStore from '../stores/useCallStore'
import VideoCall from '../components/VideoCall'
import MenuAction from '../components/MenuAction'

const HomeScreen = () => {
  const { typeCall } = useCallStore()

  return (
    <div className="flex h-screen w-screen relative">
      <div
        className={clsx(
          'bg-yellow-50 w-0 duration-700 relative overflow-hidden',
          typeCall && 'w-3/4'
        )}
      >
        <VideoCall />
      </div>

      <div className={clsx('w-1/4 h-full border-r overflow-hidden', typeCall && 'w-0 hidden')}>
        <Sidebar />
      </div>

      <div
        className={clsx(
          'bg-white flex flex-col duration-700 overflow-hidden relative',
          typeCall ? 'w-1/4' : 'w-3/4'
        )}
      >
        <Chat />
      </div>
    </div>
  )
}

export default HomeScreen
