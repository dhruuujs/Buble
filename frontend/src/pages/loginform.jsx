//Buble
import React,{useState,useContext} from 'react';
import {RiEyeOffFill,RiEyeFill} from 'react-icons/ri'
import {AuthContext} from '../context/AuthContext'
import {Link} from 'react-router-dom';




function LoginForm({ onClose }) {
const [email,setEmail]= useState('');
const [psw,setPassword] = useState('')
const [error,setError] = useState('')
const [isLoading,setIsLoading] = useState(false);
const [viewPsw,setViewPsw] =useState(false);

const {login} = useContext(AuthContext);




const handleLogin = async(e)=>{
e.preventDefault();


try{
  if(!email){
    setError("Enter username or email");
    setIsLoading(false);
    return;
  }

  if(!psw){
    setError("Enter password")
    setIsLoading(false);
    return;
  }

    setError("")
    setIsLoading(true);

  
    const response = await fetch("http://localhost:5000/account/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    mode:"cors",
    body:JSON.stringify({
      username:email,
      password:psw})
  });

  const data = await response.json();
  console.log("Frontend says:-",data)
  
  if(response.ok){
  console.log("Frontend 2nd says:-",data)
  login(data.user,data.token)
  }else{
    setIsLoading(false)
   setError(data.error);
  }


  }catch(err){ 
    setIsLoading(false)
    setError(`Error: ${err}`);
  }

}

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      
    
      <div className="bg-white p-8 rounded-xl shadow-2xl relative max-w-sm w-full transition-all duration-300 transform scale-100 opacity-100">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>


        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-4 py-2 border text-[#282828] border-gray-300 rounded-md shadow-sm outline-0 focus:ring-blue-500 focus:border-blue-500" 
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Enter username or email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
            <input 
            type={viewPsw?"text":"password"} 
            onChange={(e)=>{setPassword(e.target.value)}}
            className="mt-1 w-full px-4 py-2 border border-gray-300 text-[#282828] rounded-md shadow-sm outline-0 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter password"/>
            <span onClick={()=>setViewPsw(!viewPsw)} className="h-11 absolute right-[1%]">{viewPsw ?
            <RiEyeOffFill className="text-[#222] mt-3 text-2xl"/>:<RiEyeFill className="text-[#222] mt-3 text-2xl"/>
            }</span>
            </div>
          </div>

          <div className="text-red-600" style={{fontFamily:"'Roboto', san-serif"}}>{error}</div>

          <button type="submit" 
            className="w-full py-3 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}>
            {isLoading ? "Logging in" :"Login"}
          </button>
        </form>

     <div className="text-[#222222] ml-13">
             Don't have an account?
             <span className="underline underline-offset-4 hover:underline-offset-6 transition-[500] decoration-sky-500"><Link to="/signup"> signup</Link></span>
      </div>
     
      </div>
    </div>
  );
};


export default LoginForm;