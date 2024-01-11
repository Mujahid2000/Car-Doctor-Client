import {  useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { AuthContext } from '../AuthProvide/AuthProvide';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';


const Login = () => {
    // const { login, googleSignIn, user } = useContext(AuthContext);
    const {login, googleSignIn, user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogle = () => {
        googleSignIn().then(result => {
            navigate(location.state ? location.state : '/');
        });
    }

    useEffect(() => {
        if (user) {
            navigate(location.state ? location.state : '/');
        }
    }, [user]);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const password = form.get('password');
        const email = form.get('email');

        login(email, password)
            .then(result => {
                Swal.fire(
                    'Login Successful!',
                    'You have successfully logged in.',
                    'success'
                );
                const user = {email};
    
                axios.post('https://car-doctor-server-pi-eight.vercel.app/jwt', user, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    if(res.data.success){
                        navigate(location?.state ? location.state : '/');
                    }
                })
            })
            .catch(err => {
            
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
            });
    }

    return (
        <div className='max-w-7xl mx-auto p-4'>
            <div className="min-h-screen mt-10 min-h-screen flex items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-blue-500 lg:mt-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <p className="text-gray-500">Welcome back! Please log in to your account.</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input type="email" required placeholder='Type Your Email' id="email" name="email" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600">Password</label>
                        <input type="password" required placeholder='Password' id="password" name="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-6 flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-blue-500 font-medium underline hover:underline"><Link to='/register'>Register</Link></p>
                        <button onClick={handleGoogle} className="btn bg-blue-500 rounded-xl p-2 text-white">
                            <FcGoogle className="inline mr-2" /> Login with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
