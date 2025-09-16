import React,{useState} from 'react';
import "../styles/homepage.css";
import bubleLogo from "../assets/buble.png"; 
import LoginForm from '../pages/loginform';
import SignupForm from '../pages/signupform';

function HomePage() {

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isSignupOverlayVisible,setSignupOverlayVisible]=useState(false);
  
    const handleShowOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  
  const showSignupOverlay=()=>{
    setSignupOverlayVisible(true);
  }

    const closeSignupOverlay = () => {
        setSignupOverlayVisible(false);
    }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#252525] pt-1">
    <div className=" h-25 w-25">
      <img src={bubleLogo}/>
    </div>
    <div className="flex flex-col h-[70vh] w-[45vw] pt-10 rounded-2xl bg-[#282828]">
      <h1 className="text-5xl font-bold text-gray-200 mt-10 ml-25 mb-2">Let's get you in</h1>
      <p className="text-gray-200 text-2xl max-w-lg text-left ml-25 mb-8">
      `discover the world beyond
      </p>

      <button 
        onClick={handleShowOverlay}
        className=" h-[50px] w-[70%] ml-25 px-7 py-3 bg-blue-600 text-white 
        text-lg font-semibold rounded-lg shadow-md
        hover:bg-blue-700 transition duration-200 
        transform hover:scale-102 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 
        focus:ring-opacity-50">
        Login
      </button>



    <button 
        onClick={showSignupOverlay}
        className="px-6 py-3 h-[50px] w-[70%] ml-25 mt-3 bg-blue-600 text-white 
        text-lg font-semibold rounded-lg shadow-md
        hover:bg-blue-700 transition duration-200 
        transform hover:scale-102 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 
        focus:ring-opacity-50">
        Signup
    </button>



    {isOverlayVisible && <LoginForm onClose={handleCloseOverlay} />}
    {isSignupOverlayVisible &&  <SignupForm onClose={closeSignupOverlay} />}



   <span className="mt-50 text-center">By logining, you are agree to our policies</span>

        </div>
     
    </div>
  );


}
export default HomePage;

