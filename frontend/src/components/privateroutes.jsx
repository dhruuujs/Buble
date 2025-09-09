import {AuthContext} from '../context/AuthContext';
import {Navigate, Outlet} from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoute =()=>{
    const {user,isAuthenticated} = useContext(AuthContext);


if(!isAuthenticated) return <Navigate to="/" replace/>

if(!user){
    return <Navigate to="/" replace/>;
}

return <Outlet/>
};

export default ProtectedRoute;
