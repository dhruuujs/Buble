import React, {useState,useContext} from 'react';

import CreateChat from '../chatComponents/CreateChat.jsx';
import FriendList from '../chatComponents/friendlist.jsx';



import girl from '../../assets/girl.png';
import blackman from '../../assets/blackman.png';
import gentleman from '../../assets/gentlemanpfp.png';
import whiteman from '../../assets/whiteman.png';
import bubleLogo from '../../assets/buble.png';
import settingBtn from '../../assets/setting.png';



function ChatListLayout(){



const messagesTest = [
    { id: 1, text: 'Hello, how are you?', sender: 'other', name: 'Alice' },
    { id: 2, text: 'I am doing great, thanks!', sender: 'me', name: 'You' },
    { id: 3, text: 'What are you working on today?', sender: 'other', name: 'Alice' },
    { id: 4, text: 'Just building a cool chat UI with React and Tailwind!', sender: 'me', name: 'You' },
    { id: 5, text: 'Awesome!', sender: 'other', name: 'Alice' },
    { id: 6, text: 'This looks so clean.', sender: 'other', name: 'Alice' },
    { id: 7, text: 'The bubbles are perfectly aligned.', sender: 'me', name: 'You' },
    { id: 8, text: 'The use of Tailwind makes styling a breeze.', sender: 'me', name: 'You' },
  ];



  const [chatOpen,setChatOpen]  = useState(false);



return(
    <div className="max-w-screen h-[100vh] overflow-hidden">
            <div className="bg-[#1d1e1f] h-[8vh] max-w-screen overflow-hidden " >
                <img src={bubleLogo} className="ml-10 mt-5 h-5"/>

            </div>
    
    <div className="flex">    
            <div className="w-[7vw] h-[92vh] bg-[#1d1e1f]">   
                <img src={settingBtn} className="h-7 w-7 ml-3 mt-[40rem] hover:rotate-90 duration-200 ease-out"/>       
            </div>
            <FriendList/>
            <CreateChat/>
        </div>

             </div>
)

}


export default ChatListLayout;