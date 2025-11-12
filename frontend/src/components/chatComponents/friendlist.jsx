import {useState,useContext} from 'react'
import search from '../../assets/search.png'
import girl from '../../assets/girl.png';
import blackman from '../../assets/blackman.png';
import gentleman from '../../assets/gentlemanpfp.png';
import whiteman from '../../assets/whiteman.png';
import { AuthContext } from '../../context/AuthContext';

export default function FriendList({onFriendClick}){

const {user} = useContext(AuthContext);
const friends=[
    {name:"John Doe",status:"Online", avatar: whiteman},
    {name:"Jane Smith",status:"Offline", avatar: girl},
    {name:"Alice Johnson",status:"Away", avatar: blackman},
    {name:"Bob Brown",status:"Busy", avatar: gentleman}
];

const profilePics=[whiteman,girl,blackman,gentleman]

// local state not required for now; remove confusing names
const [getFriends,setFriendList]= useState([]);


const searchFriends=(friendQuery)=>{
    //friend list data here
    if(friendQuery=="") return "";
    console.log(getFriends);    
}


const loadFriends= async(person)=>{}
{/*const loadFriends= async(person)=>{
    try{
        const response = await fetch("http://localhost:5000/account/friends",{
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ username: user?.username })
        });
        if(response.ok){
            const data = await response.json();
            setFriendList(data)
            console.log('Loaded friends data', data);
        }
    }catch(err){
        console.error(err);
        return new Error(err)
    }
}*/}

return(
        <div className="bg-[#282828] border-r-[1px] border-r-[#464646]" style={{width:"25vw",height:"92vh"}}>      
        <h1 className="font-bold text-2xl ml-2 mt-5">Messages</h1>
               
            <div className="py-2">       
                <div className="searchBar w-[98%] flex mt-5">
                    <input 
                    type="search" 
                    onKeyDown={searchFriends}
                    className="h-11 w-95 ml-2 text-lg px-3 rounded-l-3xl text-gray-200 bg-[#2f3037] outline-0"
                    placeholder=" Search for a friend..."/>
                <div className="bg-[#2f3037] rounded-r-3xl p-2">
                    <img src={search} alt="search logo" className="w-6 mr-2 ml-1 inline-flex "/>
                    </div>
               </div>


                    {friends.map((friend,index)=>(
                    <div key={index} className="flex p-3 mt-2 hover:bg-[#2c2c2c]" onClick={()=>{onFriendClick(friend);}}>
                    <div className="rounded-4xl bg-gray-200 ml-1 mr-2 h-[50px] w-[50px]">
                        <img src={friend.avatar || profilePics[index]} alt="User chat profile" className="h-full w-full object-cover"/>
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