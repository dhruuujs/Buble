import React,{useContext} from 'react'
import HomePage from './pages/homepage';
import ChatListLayout from '../src/components/chatComponents/chatlayout'
import SignupForm from './pages/signupform'; 
import LoginForm from './pages/loginform'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './components/privateroutes';


function App() {

return(
<>
<Router>
<AuthProvider>
<Routes>
    <Route path="/" element={
    <section className="">
    <HomePage/>
    </section>}/>

{/*<Route element={<ProtectedRoute/>}>*/}
<Route path="/chat" element={
    <section className="">
    <ChatListLayout/>
    </section>
    }/>
{/*</Route>*/}


<Route path="/signup" element={
    <section className="">
    <SignupForm/>
    </section>
    }/>

<Route path="/login" element={
    <section className="">
    <LoginForm/>
    </section>
    }/>

</Routes>
</AuthProvider>
</Router>
</>

)

};


export default App;
