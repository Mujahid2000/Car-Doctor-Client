import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvide';
import { Spinner } from 'flowbite-react';



const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading)
        return <Spinner aria-label="Default status example" />

        
    if (user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login' replace></Navigate>

};


export default PrivateRoute;