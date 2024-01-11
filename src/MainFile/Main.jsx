
import { Outlet } from 'react-router-dom';
import MyNavbar from '../HomePage/Navbar';
import MyFooter from '../HomePage/MyFooter';


const Main = () => {
    return (
        <div>
            <MyNavbar></MyNavbar>
            <Outlet></Outlet>
            <MyFooter></MyFooter>
        </div>
    );
};

export default Main;