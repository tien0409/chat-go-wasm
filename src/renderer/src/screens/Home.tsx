import Sidebar from '../components/Sidebar'

const HomeScreen = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
        <Sidebar />
      </div>
      <div className="col-span-8 bg-white w-full">chat component</div>
    </div>
  )
}

export default HomeScreen
