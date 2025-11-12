import React, { useState, useRef, useEffect, useContext } from 'react';
import sendbtn from '../../assets/sendbtn.png';
import asian from '../../assets/asian.png';
import chatBg from '../../assets/chatbg.jpeg'
import '../../styles/chatlayout.css';
import ChatBubble from '../chatComponents/ChatBubble.jsx';
import { AuthContext } from '../../context/AuthContext';
import io from 'socket.io-client';
import menudot from '../../assets/menudots.svg'



const SOCKET_SERVER_URL = "http://localhost:5000";
const socket = io(SOCKET_SERVER_URL, { autoConnect: false });

function DateStamp({ date }) {
  if (!date) return null;
  // date is expected to be an ISO date string (YYYY-MM-DD or full ISO timestamp)
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return (<div className="flex justify-center my-4">
    <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-xs font-semibold">
    Error
    </span>
    </div>);

  const formattedDate = d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex justify-center my-4">
      <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-xs font-semibold">
        {formattedDate}
      </span>
    </div>
  );
}

export default function CreateChat({selectedChat}) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);
  const [chatSetting,setChatSetting]=useState(false);
  const chatSettingRef=useRef(null);


  useEffect(() => {
    socket.connect(SOCKET_SERVER_URL);

    // handler that validates and normalizes incoming messages
    const handleWelcome = (msg) => {
      if (msg === undefined || msg === null) return;

      // If server sends a simple welcome string, treat it as a system message
      if (typeof msg === 'string') {
        const sysMsg = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          text: msg,
          sender: 'system',
          name: 'System',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, sysMsg]);
        return;
      }

      // normalize timestamp: ensure it's a valid ISO string for object messages
      let ts = msg.timestamp;
      if (!ts) ts = new Date().toISOString();
      else {
        const parsed = new Date(ts);
        if (Number.isNaN(parsed.getTime())) ts = new Date().toISOString();
        else ts = parsed.toISOString();
      }
      const normalized = { ...msg, timestamp: ts };

      // don't append non-system messages until a chat is selected
      if (!selectedChat) return;
      setMessages(prev=>[...prev,normalized]);
    };
    socket.on('welcome_message', handleWelcome);

    return () => {
      socket.off('welcome_message', handleWelcome);
      socket.disconnect();
    };
  },[selectedChat]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message via soccket.io
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    var newMessage = {
      id:Date.now(),
      text: trimmed,
      sender: user?.username || 'me',
      name: user?.username || 'Dhruba',
      timestamp: new Date().toISOString(),
    };

    // Optionally, show message instantly (optimistic UI)
    setMessages(prev => [...prev,newMessage]);
    setInputValue('');
  };
  const handleDeleteMessage = (idToDelete) => {
    setMessages(messages => messages.filter(msg => msg.id !== idToDelete));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const groupedMessages = messages.reduce((groups, newMessage) => {
    const date = newMessage.timestamp ? new Date(newMessage.timestamp).toISOString().split('T')[0] : '';
    if (!groups[date]) groups[date] = [];
    groups[date].push(newMessage);
    return groups;
  }, {});
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));

const lstSeen = ()=>{

  let hour = undefined
  let day = new Date().getDate();
  let month = new Date().getMonth()+1;
  let year = new Date().getFullYear();
  let now = new Date();
  let date = now.getDate();
  let hrs = now.getHours();
  let min =  now.getMinutes();
  let sec = now.getSeconds();

  return `Last seen ${hrs}:${min}pm` || "Long Time Ago"; 
}

useEffect(()=>{
  const handleClickOutside=(event)=>{
    if(chatSettingRef.current && !chatSettingRef.current.contains(event.target)){
  setChatSetting(false);
    }
  };

  if(chatSetting){
    document.addEventListener('mousedown',handleClickOutside)
  }
  return()=>{
    document.removeEventListener('mousedown',handleClickOutside)
  }
},[chatSetting])


const openSetting=()=>{
  setChatSetting(!chatSetting);
}


  return (
    <>
    {selectedChat ?(
      <div className="chatbox flex flex-col h-[90vh] w-full">
      {/* Header */}
      <div className="flex py-2 relative bg-[#232323]">   
        <div className="mr-2">
          <img src={selectedChat?.avatar || asian} alt="User" className="h-15 w-15 ml-3 rounded-4xl object-cover" />
        </div>
        <div className=" flex flex-col pt-2">
          <h2 className="text-[1.1rem] mb-[-0.4em]">{selectedChat?.name || "User"}</h2>
          <span className="text-[0.9rem] mt-1">{lstSeen()}</span>
        </div>
      <div className="settingPanel pt-4 ml-[50rem] relative">
      <img src={menudot} alt="menu btn" 
      className="w-7 h-7 cursor-pointer rotate-90" 
      onClick={openSetting}/>
     
      {chatSetting && (
        <div
        id="chatSettingContainer" 
        className="w-[fit] h-fit rounded-lg bg-[#242424] z-50 right-2 absolute" 
        ref={chatSettingRef}>

        <ol className=" p-0.5">
          <li>Report</li>
          <li>Block</li>
          <li>Clear Chat</li>
          <li className="text-nowrap">Mute Notifications</li>
          <li>Make user poof!</li>    
        </ol>
        </div>
      )}

      </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col w-full relative h-[90%]">
        <div id="chatCtrlParentWindow" className="chatCtrlView no-scrollbar overflow-hidden flex flex-col w-[70vw] h-full ">
          <div className="flex-1 overflow-y-auto p-2 space-y-20">
            {sortedDates.map((date) => (
              <div key={date}>
                <DateStamp date={date} />
                {groupedMessages[date].map(msg => (
                  <ChatBubble
                    key={msg.id}
                    message={msg.text}
                    sender={msg.sender}
                    name={msg.name}
                    messageId={msg.id}
                    onDelete={handleDeleteMessage}
                    timestamp={msg.timestamp}
                  />
                ))}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      

        {/* Input controls */}
        <div className="ctrlContainer flex absolute bg-[#1c1e1f] w-[70.5vw] shadow-[0px_-10px_20px_rgba(20,20,20,0.2)] p-2 bottom-0">
          <form onSubmit={handleSendMessage} className="h-fit w-100% grid grid-cols-5">
            <input rows="2"
              id="msgBox"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="false"
              placeholder="Enter your message"
              className="bg-[#f4f4f4] text-[#2e2e2e] h-12 col-span-4 text-[1rem] p-3 w-[50rem] rounded-[50px] outline-0"/>
              <button type="submit" className="h-12 w-11 cursor-pointer px-3 ml-1 rounded-[50px] bg-green-800">
              <img src={sendbtn} alt="Send" />
            </button>
          </form>
        </div>
        
    </div> ):(
      <div>
        <img src={chatBg} height={500} width={1200} style={{opacity:0.01}} alt="bg texture"/>
      </div>
      )}
    </>
    )
  }
