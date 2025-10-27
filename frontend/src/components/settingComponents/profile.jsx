import React from 'react';
import whiteman from '../../assets/whiteman.png';



function Profile(){
    return(
    
        <div className="profileContainer z-[9999] pt-5 pl-5 overflow-hidden">
            <div className="rounded-full h-22 w-22 mb-8 bg-amber-500">
                <img src={whiteman}/>
            </div>
            <span><h1 className="text-2xl">Dhru</h1></span>

        <div className="mt-8">
            <h1 className="text-l">About</h1>
            <p>This is about me, nigga</p>
        </div>
        <div className="phoneNumber mt-5">
            <h1 className="text-l">Phone Number</h1>
            +91 9873458796
        </div>
            
        <div className="mt-5 h-[1px] w-[15vw] bg-gray-600"></div>
        
        <div className="mt-5">
            <button className="border-0 outline-0 rounded-[4px] text-[#f00] bg-[#313131] p-2">Log out</button>
        </div>
        </div>
    );
}



export default Profile;