import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Button = ({ children, className, disabled, ...props }) => {
    return (
        <button
            className={`py-2 rounded-md text-white transition-colors ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

const Input = ({ className, ...props }) => {
    return (
        <input
            className={`border border-gray-300 rounded-md p-2 ${className}`}
            {...props}
        />
    );
};

const Label = ({ children, className, ...props }) => {
    return (
        <label className={`text-white ${className}`} {...props}>
            {children}
        </label>
    );
};

const FadeIn = ({ children, className }) => {
    return (
        <div className={`fade-in-animation ${className}`}>
            {children}
        </div>
    );
};

export function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            const response = await fetch('https://finvest-bub4.onrender.com/login', {
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
            console.log('Login successful', data);

            // Store tokens in local storage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data));

            setFormData({
                email: '',
                password: ''
            });

            if (data.accountType === 'investor') {
                navigate('/investor-dashboard');
            } else if (data.accountType === 'looking-for-funding') {
                navigate('/funding-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full lg:grid min-h-screen lg:grid-cols-2 overflow-hidden" style={{ backgroundColor: '#04011C' }}>
            <div className="flex flex-col items-center justify-center bg-[#04011C] p-4 pt-[10vh] lg:p-0 lg:hidden">
                <FadeIn direction="down" delay={0.3} fullWidth>
                    <h1 className="text-4xl sm:text-5xl py-4 font-bold text-[#1B7A57] text-center">Welcome Back!</h1>
                </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.3} fullWidth className="flex items-center justify-center bg-[#04011C] p-2 md:p-4 py-8 lg:p-0">
                <div className="relative mx-auto grid w-[320px] sm:w-[500px] gap-6 z-10 bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg md:p-10 p-6 py-14 mb-10 shadow-lg">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-4xl font-bold py-2 text-white">Login</h1>
                        <p className="text-lg text-[#E8F6F3]">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-white">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-[#E8F6F3] underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-center">{error}</div>
                        )}
                        <Button type="submit" className="w-full bg-[#1B7A57] hover:bg-[#0e3a26]" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Button type="button" className="w-full border-[#1B7A57] text-[#1B7A57]">
                            Login with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-md text-[#E8F6F3]">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline text-[#1B7A57]">
                            Sign up
                        </Link>
                    </div>
                </div>
            </FadeIn>

            <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center bg-white relative">
                <img className="absolute right-0 z-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133535/duitolguodf7th7fzzek.svg" alt="" />
                <div className="relative text-center z-[5]">
                    <FadeIn direction="down" delay={0.3} fullWidth>
                        <h1 className="md:text-6xl text-4xl font-bold text-[#1B7A57]">Welcome Back!</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.4} fullWidth>
                        <p className="mt-4 text-xl text-[#05140D]">We are happy to see you again. Please login to continue.</p>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
