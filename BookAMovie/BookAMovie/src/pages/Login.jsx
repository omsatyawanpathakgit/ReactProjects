
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username.trim() === '' || password.trim() === '') {
            setError('Please enter both username and password.');
            return;
        }

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            navigate('/book');
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <section className="section book-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </section>
    );
}