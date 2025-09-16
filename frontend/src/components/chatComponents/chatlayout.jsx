import React, {useState,useContext} from 'react';
import CreateChat from '../chatComponents/CreateChat.jsx';
import FriendList from '../chatComponents/friendlist.jsx';
import bubleLogo from '../../assets/buble.png';
import settingBtn from '../../assets/setting.png';



function ChatListLayout(){

  const [chatOpen,setSelectedChatOpen]  = useState(null);
  const handleChatClick=(person)=>{
    setSelectedChatOpen(person);
    console.log("Selected friend:", person);
  }

return(
    <div className="max-w-screen h-[100vh] overflow-hidden">
            <div className="bg-[#1d1e1f] h-[10vh] max-w-screen overflow-hidden " >
                <img src={bubleLogo} className="ml-18 mt-6 h-7"/>
            </div>
    
    <div className="flex">    
            <div className="w-[5vw] h-[92vh] bg-[#1d1e1f]">   
                <img src={settingBtn} className="h-7 w-7 ml-3 mt-[40rem] hover:rotate-90 duration-200 ease-out"/>       
            </div>   
            <FriendList onFriendClick={handleChatClick} selectedChat={chatOpen}/>
            <CreateChat selectedChat={chatOpen}/>
    </div>
    </div>
)
}


export default ChatListLayout;