import React, { useState, useRef, useEffect, useContext } from 'react';
import sendbtn from '../../assets/sendbtn.png';
import asian from '../../assets/asian.png';
import '../../styles/chatlayout.css';
import ChatBubble from '../chatComponents/ChatBubble.jsx';
import { AuthContext } from '../../context/AuthContext';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:5000";
const socket = io(SOCKET_SERVER_URL, { autoConnect: false }); // Only connect in useEffect

// DateStamp component for displaying formatted date
function DateStamp({ date }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
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

export default function CreateChat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Connect/clean up socket and listen for incoming messages
  useEffect(() => {
    socket.connect();

    // Listen for messages from server
    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, []);

  // Scroll to bottom whenever messages update
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

    const newMessage = {
      id: Date.now(), // Better unique id than length
      text: trimmed,
      sender: user?.username || 'me',
      name: user?.username || 'You',
      timestamp: new Date().toISOString(),
    };

    // Emit to server
    socket.emit('send_message', newMessage);

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

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const date = new Date(msg.timestamp).toISOString().split('T')[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className="chatbox flex flex-col h-[90vh] w-full">
      {/* Header */}
      <div className="flex py-0 relative">
        <button
          className="h-10 w-10 ml-2 mt-2 mr-[-1.5em] p-0 shadow-[1px_1px_7px_rgba(0,0,0,0.50),-1px_-1px_6px_rgba(54,54,54,0.85)] rounded-2xl"
          onClick={() => alert("Hello")}
        >
          <svg className="stroke-[3] stroke-[#f4f4f4] ml-1" width="20" height="24" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.844308" y1="-0.844308" x2="30.6765" y2="-0.844308" transform="matrix(1 0 0 -1 1.17033 14.114)" />
            <line x1="0.844308" y1="-0.844308" x2="18.8562" y2="-0.844308" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14.6199 28.9684)" />
            <path d="M1.8755 14.9619L15.8059 1.03154" />
          </svg>
        </button>
        <div className="mr-2">
          <img src={asian} alt="User" className="h-15 w-15 ml-8 rounded-4xl" />
        </div>
        <div className=" flex flex-col pt-2">
          <h2 className="text-[1rem] mb-[-0.4em] font-bold">{user?.username || "Alice"}</h2>
          <span>Last seen on 1:45am</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col">
        <div id="chatCtrlParentWindow" className="chatCtrlView no-scrollbar bg-[#282828] overflow-hidden flex flex-col pb-17 h-[75vh] ">
          <div className="flex-1 overflow-y-auto space-y-4">
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

        {/* Input controls */}
        <div className="ctrlContainer flex absolute bg-[#282828] w-[65.8vw] shadow-[0px_-10px_20px_rgba(20,20,20,0.2)] p-2 bottom-0 z-50">
          <form onSubmit={handleSendMessage}>
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your message"
              className="bg-[#f4f4f4] text-[#252525] mt-2 h-12 text-[1rem] ml-0 p-3 w-[50vw] rounded-[50px] outline-0"
            />
            <button type="submit" className="h-12 w-11 cursor-pointer ml-2 px-3 rounded-[50px] bg-green-800">
              <img src={sendbtn} alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}