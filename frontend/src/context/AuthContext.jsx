import { createContext,useState,useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null)

export const AuthProvider =({children})=>{

try{

    const [user,setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || null)
    const navigate = useNavigate();


const login = useCallback(async (userData,authToken)=>{
    if (!authToken) {
        setUser(null);
        setToken(null);
        throw new Error("Auth token is not valid!")
    }
    if(!userData){
        setUser(null);
        setToken(null);
        throw new Error("User details not valid!")
    }

    //seanmadden
    localStorage.setItem("token", authToken);
    console.log("Saving token to local storage:", authToken);
    setToken(authToken);
    setUser(userData);
    navigate('/chat');
},[]);


const logout = useCallback(()=>{
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login")
},[navigate])


const verifyToken=useCallback(async(storedToken)=>{
try{
    const response = await fetch("http://localhost:5000/account/auth",{
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
    return err;
}
},[]);

useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if(!storedToken) throw new Error("Failed to access token!\n");

verifyToken(storedToken).then(user=>{
    setUser(user);
    setToken(storedToken)
}).catch((err)=>{
    logout()
    throw new Error(err);
})
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

    }catch(err){
    throw new Error(err);
    }
}

export {AuthContext};
