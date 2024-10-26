import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Button = ({ children, className, disabled, ...props }) => {
    return (
        <button
            className={`py-2 rounded-md transition-colors ${className}`}
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
            className={`border rounded-md p-2 ${className}`}
            {...props}
        />
    );
};

const Label = ({ children, className, ...props }) => {
    return (
        <label className={`text-gray-200 ${className}`} {...props}>
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
        <div className="relative w-full lg:grid min-h-screen lg:grid-cols-2 overflow-hidden" style={{ backgroundColor: '#0D0A2C' }}>
            <div className="flex flex-col items-center justify-center p-4 pt-[10vh] lg:p-0 lg:hidden">
                <FadeIn direction="down" delay={0.3} fullWidth>
                    <h1 className="text-4xl sm:text-5xl py-4 font-bold text-white text-center">Welcome Back!</h1>
                </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.3} fullWidth className="flex items-center justify-center p-2 md:p-4 py-8 lg:p-0">
                <div
                    className="relative mx-auto grid w-[320px] sm:w-[500px] gap-6 z-10 rounded-lg md:p-10 p-6 py-14 mb-10 shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, #153984, #4B0B4C)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <div className="grid gap-2 text-center">
                        <h1 className="text-4xl font-bold py-2 text-white">Login</h1>
                        <p className="text-lg text-gray-300">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-transparent text-white border-[#d3d5de]"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-gray-300 underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-transparent text-white border-[#d3d5de]"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-400 text-center">{error}</div>
                        )}
                        <Button type="submit" className="w-full bg-[#E60BA9] hover:bg-[#d2098f] text-white">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Button type="button" className="w-full bg-[#4B0B4C] text-white hover:bg-[#3d093d] border border-[#3e0a3e]">
                            Login with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-md text-gray-200">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline text-white">
                            Sign up
                        </Link>
                    </div>
                </div>
            </FadeIn>

            <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center relative">
                <div className="relative text-center z-[5]">
                    <FadeIn direction="down" delay={0.3} fullWidth>
                        <h1 className="md:text-6xl text-4xl font-bold text-white">Welcome Back!</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.4} fullWidth>
                        <p className="mt-4 text-xl text-gray-300">We are happy to see you again. Please login to continue.</p>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
