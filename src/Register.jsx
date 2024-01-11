import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvide/AuthProvide';


const Register = () => {
    const { createUser, user } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(location.state ? location.state : '/')
        }
    }, [user])

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(password)) {
            setPasswordError("Password must contain at least one special character.");
            return;
        }
        createUser(email, password)
            .then(() => {
                Swal.fire(
                    'Registration Successful!',
                    'You have successfully registered.',
                    'success'
                );

            })
            .catch(error => {

                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already in use!',
                    });
                }
            });
    };

    return (
        
        <div className='max-w-7xl mx-auto'>
            <div className="min-h-screen flex items-center justify-center rounded-xl bg-gray-100 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-600">Name</label>
                        <input type="text" placeholder='Your Name' id="name" name="name" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input type="email" placeholder='Type Your Email' id="email" name="email" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400" required />
                    </div>
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <input type="password" placeholder='Password' id="password" name="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400" required />
                        {
                            passwordError && (
                                <span className="text-red-500">{passwordError}</span>
                            )
                        }
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Register
                        </button>
                        <p className="text-gray-600">Already have an account? <Link className='text-blue-500 hover:underline' to='/login'>Login</Link></p>
                    </div>

                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;
