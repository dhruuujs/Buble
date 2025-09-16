import React,{useState,useRef,useEffect,useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';

function ChatBubble({message,sender,name,messageId,onDelete,timestamp}) {

const user = useContext(AuthContext);
name ="Dhru"

  //if(response.ok){console.log(response.json())}

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
};

const [isPopupOpen ,setIsPopupOpen] = useState(false);
const bubbleRef =useRef(null)


const messagesTest = [
    { id: 1, text: 'Hello, how are you?', sender: 'other', name: 'Alice' },
    { id: 2, text: 'This looks so clean.', sender: 'other', name: 'Alice' },
    { id: 3, text: 'The bubbles are perfectly aligned.', sender: 'me', name: 'You' },
    { id: 4, text: 'The use of Tailwind makes styling a breeze.', sender: 'me', name: 'You' },
  ];


  const isMe = sender === 'me';
  
  const formattedTime =new Date(timestamp).toLocaleTimeString('en-US',{
    hour:'2-digit',
    minute:'2-digit',    
  })

  
  const chatBubbleClasses = `
    flex w-full
    ${isMe ? 'justify-end' : 'justify-start px-5'}
  `;

  const profilePicClasses = `
    flex items-center justify-center 
    w-10 h-10 min-w-[2.5rem]
    rounded-full font-semibold
    text-white
    ${isMe ? 'bg-blue-500' : 'bg-gray-500'}
  `;

  const messageBubbleClasses = `
    max-w-[70%] p-3 m-1 rounded-xl
    text-white shadow-[3px_3px_10px_rgba(0,0,0,0.5),-1px_-1px_15px_rgba(80,80,80,0.5)] transform transition-transform duration-200
    ${isMe ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}
  `;



  useEffect(()=>{
      const handleClickOutside=(event)=>{
      if(bubbleRef.current && !bubbleRef.current.contains(event.target)){
        setIsPopupOpen(false)
      }
      };

      if(isPopupOpen){
         document.addEventListener('mousedown',handleClickOutside)
      }

  return ()=>{
    document.removeEventListener('mousedown',handleClickOutside)
  }

},[isPopupOpen])

const togglePopup=()=>{
  setIsPopupOpen(!isPopupOpen);
}

 const handleDeleteClick = () => {
    onDelete(messageId); // Call the onDelete prop with the message's ID
    setIsPopupOpen(false); // Close the popup
  };


  return (
    <div className={chatBubbleClasses} >
      
      <div className="flex items-end max-w-lg relative" ref={bubbleRef}>
        
    
        {isPopupOpen && ( 
      <div className={`absolute z-10 p-2 rounded-lg shadow-2xl
       bg-[#282828] text-white text-sm flex flex-col space-y-1
       ${isMe? '-left-42 top-0': '-right-30 top-0'}
       transform ${isMe ?'translate-x-full': '-translate-x-full'}
       `}>
           <button className="px-2 py-1 rounded-md hover:text-[#f4f4f4] hover:bg-gray-500">Reply</button>
            <button className="px-2 py-1 rounded-md hover:text-[#f4f4f4] hover:bg-gray-500">Forward</button>
            <button onClick={handleDeleteClick} className="px-2 py-1 rounded-md text-[#f00] hover:text-[#f4f4f4] hover:bg-[#f00]">Delete</button>
         </div>
        )}

        {!isMe && (
          <div className={profilePicClasses}>
            {getInitial(name)}
          </div>
        )}

        <div className={messageBubbleClasses} onClick={togglePopup}>
          <div>{message}</div>
          <div className="text-xs opacity-75 mt-1">{formattedTime}</div>
        </div>

        {isMe && (
          <div className={profilePicClasses}>
            {getInitial(name)}
          </div>
        )}
      </div>

    </div>
  );    
};


export default ChatBubble;
