"use client";

import { Button, Navbar } from "flowbite-react";
// import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
// import { AuthContext } from "../AuthProvide/AuthProvide";

const MyNavbar = () => {

    // const { user, logout } = useContext(AuthContext);
    const {user, logout} = useAuth()
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
    }

return (
    <div>
    <Navbar fluid rounded>
        <Navbar.Brand href="https://i.ibb.co/tLNhKn7/logo.png">
        <img
            src="https://i.ibb.co/tLNhKn7/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Car Doctor
        </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-4 items-center">
        <img className="w-6 h-6" src="https://i.ibb.co/vYTHyM2/Frame.jpg" alt="" />
        <CiSearch className="w-6 h-6"></CiSearch>
        <Link to='/login'>
        <Button
        gradientDuoTone="cyanToBlue"
        outline
        >
        <p >
        {
                                user?.email?
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <img src={user?.photoURL} className="rounded-full w-12" alt="" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                e.target.nextSibling.classList.toggle("hidden")
                                            }} />
                                            <p className="absolute hidden top-12 left:[0%] lg:right-[60px] w-[150px] lg:w-[220px] bg-blue-500 px-2 py-1 rounded text-center">{user?.displayName}</p>
                                        </div>
                                        <button onClick={handleLogOut} className="text-red-800">LogOut</button>
                                    </div>
                                    :

                                    <div>
                                        <li>
                                            <Link
                                                to="/login"
                                                className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "text-[#333333] underline font-medium text-lg" : ""
                                                }
                                            >
                                                <button className="btn btn-info text-gray-900">Login</button>

                                            </Link>

                                        </li>
                                    </div>
                            }
        </p>
        </Button>
        </Link>
        <Button gradientDuoTone="purpleToPink">Appointment</Button>
        <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
        <Navbar.Link href="/" active>
            Home
        </Navbar.Link>
        <Navbar.Link href="">About</Navbar.Link>
        <Navbar.Link href="">Services</Navbar.Link>
        <Navbar.Link href="">Blog</Navbar.Link>
        <Navbar.Link href="">Contact</Navbar.Link>
        <p>
        {
            user?.email?
            <Link to='bookings'><li>My Bookings</li></Link>
            :
            null
        }
        </p>
        </Navbar.Collapse>
    </Navbar>
    </div>
);
};

export default MyNavbar;
