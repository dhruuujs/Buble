import React, {useState,useRef,useContext, useEffect} from 'react';
import CreateChat from '../chatComponents/CreateChat.jsx';
import FriendList from '../chatComponents/friendlist.jsx';
import bubleLogo from '../../assets/buble.png';
import settingBtn from '../../assets/setting.png';
import Profile from '../settingComponents/profile.jsx'
import '../../styles/createchat.css'




function ChatListLayout(){

  const [chatOpen,setSelectedChatOpen]  = useState(null);
  const [settingWindow, toggleSettingWindow] = useState(false)
  const settingRef=useRef(null);
  
  const handleChatClick=(person)=>{
    setSelectedChatOpen(person);
    console.log("Selected friend:", person);
  }

  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(settingRef.current && !settingRef.current.contains(event.target)){
        toggleSettingWindow(false);
      }
    };

    if(settingWindow){
      document.addEventListener('mousedown',handleClickOutside)
    }

    return()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[settingWindow])


const openSetting=()=>{
    toggleSettingWindow(!settingWindow);
  }



return(
    <div className="max-w-screen h-[100vh] overflow-hidden">
            <div className="bg-[#1d1e1f] h-[10vh] max-w-screen overflow-hidden " >
                <img src={bubleLogo} className="ml-18 mt-6 h-7"/>
            </div>
    
    <div className="flex">    
            <div className="w-[5vw] h-[92vh] bg-[#1d1e1f] relative">   
                <img src={settingBtn} onClick={openSetting} id="settingBtn" className="h-7 w-7 ml-3 mt-[40rem]"/>       
            
            {settingWindow && (
            <div className="settingContiner flex absolute h-[70vh] w-[30vw] left-1 bottom-1 bg-[#1f2021]"  ref={settingRef}>
            <div className="w-[12vw] overflow-hidden h-[calc(100%-2vh)] bg-[#17191b]">
              <ol className="text-xs">
                <li className="mt-2 activeSettingBtn">Home</li>
                <li>Account</li>
                <li>Chats</li>
                <li>Notification</li>
                <li>Help</li>
                <br/>
                <li className="mt-[90%]">Profile</li>
              </ol>
              </div>
              <div classname="float-right bg-amber-500 w-[18vw] h-[70vh]">
                {/*> This section is for setting components */}
              <Profile/>
              </div>

            </div>
          )}


            </div>   
            <FriendList onFriendClick={handleChatClick} selectedChat={chatOpen}/>
            <CreateChat selectedChat={chatOpen}/>
    </div>
    </div>
)
}


export default ChatListLayout;