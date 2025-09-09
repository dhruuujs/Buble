import {useState} from 'react'
import search from '../../assets/search.png'



export default function FriendList(){


const friends=[
    {name:"John Doe",status:"Online"},
    {name:"Jane Smith",status:"Offline"},
    {name:"Alice Johnson",status:"Away"},
    {name:"Bob Brown",status:"Busy"}
];



const [openChat,setOpenChat] = useState(false)



//try{const response = fetch("http://localhost:5000/account/friends")if(response.ok){}}catch(err){}


return(

            <div className="bg-[#282828] border-r-[1px] border-r-[#464646]" style={{width:"45vw",height:"92vh"}}>               
               <div className="searchBar w-full flex mt-5">
                <input 
                type="search" 
                className="h-11 w-95 ml-2 px-3 rounded-l-3xl text-gray-200 bg-[#2f3037] outline-0"
                placeholder=" Search for a friend..."
                />
                <div className="bg-[#2f3037] rounded-r-3xl p-2">
                    <img src={search} alt="search logo" className="w-7 mr-2 ml-1 inline-flex "/>
                    </div>
               </div>

               <div className=" py-2">
               <h1 className="font-bold text-2xl ml-2 mt-5">Messages</h1>
               
               
                    {/*<img src={girl}/>*/}
                    {friends.map((friend,index)=>(
                    <div key={index} className="flex p-3 mt-2 hover:bg-[#2c2c2c]" onClick={()=>setOpenChat(true)}>
                    <div className="rounded-4xl bg-gray-200 ml-1 mr-2 h-[50px] w-[50px]"></div>
                    <div className="flex flex-col"> 
                    <p className=" h-fit" key={index}> {friend.name}</p>
                   <div className="lastMessage">
                        this is a test message 
                   </div>
                   </div>
                </div>
                    ))}
                </div>
            </div>
)

}