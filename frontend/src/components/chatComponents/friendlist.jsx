import {useState} from 'react'
import search from '../../assets/search.png'
import girl from '../../assets/girl.png';
import blackman from '../../assets/blackman.png';
import gentleman from '../../assets/gentlemanpfp.png';
import whiteman from '../../assets/whiteman.png';

export default function FriendList({onFriendClick}){

const friends=[
    {name:"John Doe",status:"Online"},
    {name:"Jane Smith",status:"Offline"},
    {name:"Alice Johnson",status:"Away"},
    {name:"Bob Brown",status:"Busy"}
];

const profilePics=[whiteman,girl,blackman,gentleman]
//const [chatProfile,setChatProfile]=useState(null);

const openChatWindow=(person)=>{
setChatProfile(person);
}


const searchFriends =()=>{
    //friend list data here
    //fillter usernames
    //sorting function here

}


//try{const response = fetch("http://localhost:5000/account/friends")if(response.ok){}}catch(err){}

return(
        <div className="bg-[#282828] border-r-[1px] border-r-[#464646]" style={{width:"26vw",height:"92vh"}}>      
        <h1 className="font-bold text-2xl ml-2 mt-5">Messages</h1>
               
            <div className="py-2">       
                <div className="searchBar w-[98%] flex mt-5">
                    <input 
                    type="search" 
                    onFocus={searchFriends}
                    className="h-11 w-95 ml-2 px-3 rounded-l-3xl text-gray-200 bg-[#2f3037] outline-0"
                    placeholder=" Search for a friend..."/>
                <div className="bg-[#2f3037] rounded-r-3xl p-2">
                    <img src={search} alt="search logo" className="w-7 mr-2 ml-1 inline-flex "/>
                    </div>
               </div>


                    {friends.map((friend,index)=>(
                    <div key={index} className="flex p-3 mt-2 hover:bg-[#2c2c2c]" onClick={()=>onFriendClick(friend)}>
                    <div className="rounded-4xl bg-gray-200 ml-1 mr-2 h-[50px] w-[50px]">
                        <img src={profilePics[index]} alt="User chat profile"/>
                    </div>
                    <div className=""> 
                    <p className=" h-fit" key={index}> {friend.name}</p>
                    <p className="lastMessage">
                        this is a test message 
                    </p>
                    </div>           
                    </div>
                ))}
            </div>
        </div>
)
}