import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"

export function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' 
    });

    const [selection, setSelection] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSelection = (option) => {
        setFormData({ ...formData, role: option });
        setSelection(option);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const endpoint = 'http://localhost:8000/signup';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Signup successful', data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/settings');
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full lg:grid lg:grid-cols-2 min-h-screen overflow-hidden bg-[#04011C]">
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#04011C] to-[#0A1A2B] w-full p-8 min-h-screen">
                <h1 className="text-4xl md:text-6xl font-bold text-white">Join Us!</h1>
                <p className="mt-4 text-md md:text-lg text-[#E8F6F3]">SELECT YOUR ROLE</p>
                <div className="mt-8 flex flex-col gap-4 w-full max-w-[400px]">
                    <button
                        className={`w-full py-2 rounded-md transition-transform transform border-2 border-[#1B7A57] text-[#1B7A57] bg-transparent hover:bg-[#1B7A57] hover:text-white ${selection === "Investor" ? "bg-[#1B7A57] text-white" : ""}`}
                        onClick={() => handleSelection("Investor")}
                    >
                        Investor
                    </button>
                    <button
                        className={`w-full py-2 rounded-md transition-transform transform border-2 border-[#1B7A57] text-[#1B7A57] bg-transparent hover:bg-[#1B7A57] hover:text-white ${selection === "Organisation" ? "bg-[#1B7A57] text-white" : ""}`}
                        onClick={() => handleSelection("Organisation")}
                    >
                        Organisation
                    </button>
                </div>
            </div>

            {!selection ? (
                <div className="flex items-center justify-center w-full bg-[#0A1A2B] p-4 lg:p-0">
                    <div className="relative mx-auto flex flex-col items-center justify-center w-full max-w-[90%] min-h-[500px] gap-3 z-10 animate-fade-in">
                        <h1 className="md:text-7xl text-5xl text-white font-semibold text-center py-3 z-[5]">Welcome to Finvest</h1>
                        <h3 className="text-3xl text-white text-center py-3 z-[5]">Choose an option to continue</h3>
                        <div className="text-center text-md text-[#E8F6F3]">
                            Already have an account?{" "}
                            <Link to="/login" className="underline text-[#1B7A57]">Login</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full bg-[#0A1A2B] p-4 lg:p-0">
                    <div className="relative mx-auto grid w-full max-w-[500px] gap-6 z-10 animate-fade-in bg-[#E8F6F3] bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg my-10 lg:my-0 p-6 shadow-lg">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold py-2 text-white">Sign Up</h1>
                            <p className="text-md md:text-lg text-[#E8F6F3]">Enter your details below to create a new account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-white">Username</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="p-2 rounded-md border border-[#1B7A57] bg-transparent text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-white">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="p-2 rounded-md border border-[#1B7A57] bg-transparent text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password" className="text-white">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="p-2 rounded-md border border-[#1B7A57] bg-transparent text-white"
                                />
                            </div>
                            <button type="submit" className="mt-4 bg-[#1B7A57] text-white py-2 rounded-md relative">
                                {loading ? (
                                    <div className="spinner absolute left-1/2 transform -translate-x-1/2" />
                                ) : (
                                    'Sign Up'
                                )}
                                {loading && <span className="ml-2">Signing up...</span>}
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                        <div className="text-center text-md text-[#E8F6F3] mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="underline text-[#1B7A57]">Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}