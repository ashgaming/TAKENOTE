import { LogIn, LogOut, MessageSquare, Settings, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/user.action';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
    const name = import.meta.env.PROJECT_NAME || 'TAKENOTE';
    const { user } = useSelector(state => state.UserData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const HandleLoginBtnClick = () =>{
        if(user?.user?._id){
            dispatch(logoutUser())
        }else{
            navigate('/users/login')
        }
    }
    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => toggleSidebar}
                ></div>
            )}

            <div className={`fixed lg:static lg:flex z-30 h-full bg-gray-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:w-64 lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full w-64">
                    <div className="p-4 bg-violet-900 flex justify-between items-center">
                        <h1 className="text-white text-xl font-bold">
                            {name}
                        </h1>
                        <button
                            onClick={() => toggleSidebar()}
                            className="lg:hidden text-white hover:text-gray-300 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {[1, 2, 3].map((chat) => (
                            <div key={chat} className="p-3 hover:bg-violet-900/20 rounded-lg cursor-pointer flex items-center space-x-3">
                                <MessageSquare className="text-violet-500" size={20} />
                                <span className="text-gray-300">Chat {chat}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex items-center space-x-3 text-gray-300 hover:bg-violet-900/20 p-2 rounded-lg cursor-pointer">
                            <Settings size={20} />
                            <span>Settings</span>
                        </div>
                        <button onClick={() => HandleLoginBtnClick()} className="flex w-full items-center space-x-3 text-gray-300 hover:bg-violet-900/20 p-2 rounded-lg cursor-pointer mt-2">
                            {
                                user?.user?._id ?
                                    <>
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </> :
                                    <>
                                        <LogIn size={20} />
                                        <span>Login</span>
                                    </>
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
