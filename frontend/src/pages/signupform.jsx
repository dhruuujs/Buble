import React,{useState,useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Link} from 'react-router-dom';
import {RiEyeOffFill, RiEyeFill } from 'react-icons/ri'


function SignupForm({onClose}){

const [isLoading,setLoading]=useState(false);
const [error,setError] = useState('');
const [text,setText] = useState('');
const [password,setPassword] = useState('')
const [secondaryCreds,setSecondaryCreds] = useState('');
const [viewPsw, setViewPsw] = useState(false);
const {login} = useContext(AuthContext)


const submitForm = async(e)=>{
e.preventDefault();


try{
    if(!text){
      setError("Enter username") 
      return;
    }

    if(!text.length>=3){
      setError("Username must be at least 3 characters long");
      return;
    }


    if(!password){
      setError("Enter password");
      return;
    }


    if(!secondaryCreds){
      setError("Enter phone number or email")
      return;
    }

    setLoading(true);
    setError("")

  const response = await fetch("http://localhost:5000/account/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    mode:"cors",
    body:JSON.stringify({
    username:text,
    password:password,
    secondCred:secondaryCreds
    })
});

const data = await response.json();
login(data.username,data.token)

}catch(err){
    setError(`Failed to create account at the moment`)
    setLoading(false);
  }

}



  return(
        <>
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

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Start with an account</h2>
        <form 
        className="space-y-4" 
        onSubmit={submitForm}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text"
              name="username" 
              onChange={(e)=>setText(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 outline-0 text-[#282828] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter your username"
            /> 
          </div>
   
          <div>    
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex relative">
            <input 
            type={viewPsw? "text":"password"}
            name="password" 
            onChange={(e)=>setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border-t border-l border-b border-gray-300 outline-0 text-[#282828] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"/>
            <span onClick={()=>setViewPsw(!viewPsw)} className="h-11 absolute right-[1%] ">{viewPsw ?
              <RiEyeOffFill className="text-[#222] mt-3 text-2xl"/>:<RiEyeFill className="text-[#222] mt-3 text-2xl"/>
            }</span>
            </div>
           
          </div>

          <div>
            <div>
            <label className=" text-sm font-medium text-gray-700">Email/Phone number</label>
            <input 
            type="text" 
            name="secondCred"
            onChange={(e)=>setSecondaryCreds(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 outline-0 text-[#282828] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email/Phone number"/>
          </div>

             {error && <span className='p-1 text-red-500' style={{fontFamily:"'Roboto', sans-serif"}}>{error}</span>}
          </div>
          
          <button type="submit" 
          className="w-full py-3 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"       
          disabled ={isLoading}>
          {isLoading ? "Creating account...":"Let's go"}
          </button>
        </form>


      <div className="text-[#222222] ml-13">
        Already have an account?
        <span className="underline underline-offset-4 hover:underline-offset-6 transition-[500] decoration-sky-500"><Link to="/login"> login</Link></span>
      </div>


      </div>


    </div>
        </>
    );
}


export default SignupForm;

