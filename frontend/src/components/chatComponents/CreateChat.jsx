import React ,{useState,useRef,useEffect,useContext} from 'react';
import sendbtn from '../../assets/sendbtn.png'
import asian from '../../assets/asian.png'
import '../../styles/chatlayout.css'
import ChatBubble from '../chatComponents/chatbubble'
import {AuthContext} from '../../context/AuthContext'
import {io} from 'socket.io-client';

const socket = io("http://localhost:5000")

export default function CreateChat() {


const {user}=useContext(AuthContext);  
const DateStamp = ({ date }) => {
  // Format the date to be more readable
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

)
};


const [messages,setMessage] = useState([]);
const [inputValue, setInputValue] = useState('');

  const handleSendMessage= async(e)=>{
    
    e.preventDefault();

      if(inputValue.trim()=='') return;

        const newMessage={
              id: messages.length + 1,
              text: inputValue,
              sender: 'me',
              name: 'You',
              timestamp:new Date(), 
        }


        setMessage([...messages,newMessage])
        const now=new Date();
        const date= now.toLocaleString();

              const txt = await fetch('http://localhost:5000/data',{
              method :'POST',
              headers:{'Content-Type':'application/json'},
              mode:'cors',
              body:JSON.stringify({
                sender:newMessage.sender,
                message:inputValue,
                date:date,
              })
             })
             .then(setInputValue(""))
             .then(res=>res.json())
             .then(data=>{
              console.log("Response from server:",data.data);
             })
             .catch(err=>console.log("Server throws error: ", err))
         
 }

        const handleDeleteMessage = (idToDelete) => {
        // Use the filter method to create a new array without the message to delete
        setMessage(messages.filter(msg => msg.id !== idToDelete));
        };

        const handleKeyDown=(e)=>{
        if(e.key=='Enter' && !e.shiftKey){
          handleSendMessage(e);
            }  
        }

        
      const groupedMessages = messages.reduce((groups, message) => {    
      const date = new Date(message.timestamp).toISOString().split('T')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(message);
          return groups;
        }, {});

 const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));


useEffect()


 return (
<div className="chatbox flex flex-col h-[90vh] w-full">


 <div className="flex py-0 relative">      
            <button className="h-10 w-10 ml-2 mt-2 mr-[-1.5em] p-0 shadow-[1px_1px_7px_rgba(0,0,0,0.50),-1px_-1px_6px_rgba(54,54,54,0.85)] rounded-2xl" >
            <svg onClick={()=>alert("Hello")} className=" stroke-[3] stroke-[#f4f4f4] ml-1" width="20" height="24" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.844308" y1="-0.844308" x2="30.6765" y2="-0.844308" transform="matrix(1 0 0 -1 1.17033 14.114)"/>
            <line x1="0.844308" y1="-0.844308" x2="18.8562" y2="-0.844308" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14.6199 28.9684)"/>
            <path d="M1.8755 14.9619L15.8059 1.03154"/>
            </svg>
            </button>


        <div className="mr-2 ">
            <img src={asian} className="h-15 w-15 ml-8 rounded-4xl"/>
        </div>
                <div className=" flex flex-col pt-2">
                    <h2 className="text-[1rem] mb-[-0.4em] font-bold">{user?.username || "Alice"}</h2>
                    <span>Last seen on 1:45am</span>
                </div>

        </div>


  <div className="flex flex-col">
    <div id="chatCtrlParentWindow" className="chatCtrlView no-scrollbar bg-[#282828] overflow-hidden flex flex-col pb-17 h-[75vh] ">

        <div className="flex-1 overflow-y-auto space-y-4">
            {sortedDates.map((date)=>(
              <div key={date}>
              <DateStamp date={date} />
                {groupedMessages[date].map((msg) => (
                            <ChatBubble
                            key={msg.id}
                            message={msg.text}
                            sender={msg.sender}
                            name={msg.name}
                            messageId={msg.id}
                            onDelete={handleDeleteMessage}//passed on function as props
                            timestamp={msg.timestamp}/> /// pass the timestamp down as a prop
                        ))}    
      </div>
            ))}
        </div>
    </div>


        <div className="ctrlContainer flex absolute bg-[#282828] w-[65.8vw] shadow-[0px_-10px_20px_rgba(20,20,20,0.2)] p-2 bottom-0 z-50">
               <form onSubmit={handleSendMessage}>
                        <textarea 
                        type="text" 
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter you message" 
                        className="bg-[#f4f4f4] text-[#252525] mt-2 h-12 text-[1rem] ml-0 p-3 w-[50vw] rounded-[50px] outline-0"/>
                
                        <button type="submit" className="h-12 w-11 cursor-pointer ml-2 px-3 rounded-[50px] bg-green-800">
                        <img src={sendbtn}/>
                        </button>
                </form>
        </div>
    </div>
  </div>
  );
}