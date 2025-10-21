import React, { useState, useRef, useEffect, useContext } from 'react';
import sendbtn from '../../assets/sendbtn.png';
import asian from '../../assets/asian.png';
import texture from '../../assets/texture.svg'
import chatBg from '../../assets/chatbg.jpeg'
import '../../styles/chatlayout.css';
import ChatBubble from '../chatComponents/ChatBubble.jsx';
import { AuthContext } from '../../context/AuthContext';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:5000";
const socket = io(SOCKET_SERVER_URL, { autoConnect: false }); // Only connect in useEffect

// DateStamp component for displaying formatted date
function DateStamp({ date }) {
  if (!date) return null;
  // date is expected to be an ISO date string (YYYY-MM-DD or full ISO timestamp)
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return <div className="flex justify-center my-4"><span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-xs font-semibold">Invalid date</span></div>;

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

  useEffect(() => {
    socket.connect(SOCKET_SERVER_URL);

    socket.on('welcome_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socket.off('welcome_message');
      socket.disconnect();
    };
  },[]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message via Socket.IO
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    var newMessage = {
      id: Date.now(),
      text: trimmed,
      sender: user?.username || 'me',
      name: user?.username || 'Dhruba',
      timestamp: new Date().toISOString(),
    };

    const myMsg="My message"
    socket.emit('send_message', myMsg);

    // Optionally, show message instantly (optimistic UI)
    setMessages(prev => [...prev, newMessage]);
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
          <h2 className="text-[1rem] mb-[-0.4em] font-bold">{selectedChat?.name || "Alice"}</h2>
          <span>Last seen on 1:45am</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col w-full relative h-[90%]">
        <div id="chatCtrlParentWindow" className="chatCtrlView no-scrollbar bg-[#282828] overflow-hidden flex flex-col mr-5 w-[70vw] h-full ">
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
        <div className="ctrlContainer flex absolute bg-[#1c1e1f] w-[70vw] shadow-[0px_-10px_20px_rgba(20,20,20,0.2)] p-2 bottom-0">
          <form onSubmit={handleSendMessage} className="h-fit w-full inline-block items-center">
            <input rows="2"
              id="msgBox"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="false"
              placeholder="Enter your message"
              className="bg-[#f4f4f4] text-[#252525] mt-2 h-12 text-[1rem] ml-0 p-3 w-[50rem] rounded-[50px] outline-0"/>
              <button type="submit" className="h-12 w-11 cursor-pointer ml-2 px-3 rounded-[50px] bg-green-800">
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
