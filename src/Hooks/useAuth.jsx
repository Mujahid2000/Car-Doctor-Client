import { useContext } from "react";
import { AuthContext } from "../AuthProvide/AuthProvide";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;

};

export default useAuth;