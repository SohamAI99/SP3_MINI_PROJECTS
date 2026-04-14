const { useState } = React;

function App() {
    // UI State Context
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null); // Holds the logged in user info
    
    // Form Inputs State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    
    // UI Feedback State
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Executes authentication api request
     */
    const handleAuth = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        
        try {
            // Interact with the Node API backend
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Parse response json
            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    // Update frontend state with returned user data
                    setUser(data.user);
                } else {
                    // Successful Signup
                    setMessage("Registration successful! You can now login.");
                    setIsLogin(true); // Switch to login screen dynamically
                    setFormData({ username: '', email: '', password: '' });
                }
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Server connection failed");
        }
    };

    const handleLogout = () => {
        setUser(null);
        setFormData({ username: '', email: '', password: '' });
    };

    // View Logic 1: Render the Dashboard if user is logged in natively
    if (user) {
        return (
            <div className="auth-container">
                <div className="dashboard">
                    <h2>Welcome, {user.username}! 🎉</h2>
                    <p>You have successfully logged into the system.</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        );
    }

    // View Logic 2: Render Authentication forms
    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button 
                    className={`tab-btn ${isLogin ? 'active' : ''}`} 
                    onClick={() => { setIsLogin(true); setError(''); setMessage(''); }}
                >
                    Login
                </button>
                <button 
                    className={`tab-btn ${!isLogin ? 'active' : ''}`} 
                    onClick={() => { setIsLogin(false); setError(''); setMessage(''); }}
                >
                    Signup
                </button>
            </div>

            {error && <div className="alert error">{error}</div>}
            {message && <div className="alert success">{message}</div>}

            <form className="auth-form" onSubmit={handleAuth}>
                {!isLogin && (
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                )}
                
                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                
                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>

                <button type="submit" className="submit-btn">
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}

// Render React App to the DOM
const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);
