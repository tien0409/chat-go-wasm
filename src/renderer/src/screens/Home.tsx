import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const HomeScreen = () => {
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-4 w-full h-full border-r overflow-hidden">
        <Sidebar />
      </div>
      <div className="col-span-8 bg-white w-full flex flex-col overflow-hidden relative">
        <Chat />
      </div>
    </div>
  )
}

export default HomeScreen
