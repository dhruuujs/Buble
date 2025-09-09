import { createContext,useState,useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext= createContext()


export const AuthProvider =({children})=>{
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || null)
    const navigate = useNavigate();


const login = useCallback(async (userData,authToken)=>{
    localStorage.setItem("token", authToken)
    console.log("Saving token to local storage:", authToken)
    setToken(authToken);
    setUser(userData)
    navigate('/chat')
    console.log("Redirected to chat page")
},[]);



const logout = useCallback(()=>{
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/")
},[])


const verifyToken=useCallback(async(storedToken)=>{
try{
    const response = await fetch("http://localhost:5000/account/authenticate",{
    headers:{
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
    }
});


if(!response.ok){
    throw new Error("Token invalid")
}
const {user} = await response.json();
return user;
}catch(err){
throw err;
}
},[]);

useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if(!storedToken) return;

verifyToken(storedToken).then(user=>{
    setUser(user);
    setToken(storedToken)
}).catch(()=>logout())
},[verifyToken,logout])


return(
    <AuthContext.Provider
    value={{
        user,
        login,
        logout,
        token,
        isAuthenticated: !!token,
    }}>
    {children}
    </AuthContext.Provider>
)


}
export {AuthContext};
export default AuthProvider;

