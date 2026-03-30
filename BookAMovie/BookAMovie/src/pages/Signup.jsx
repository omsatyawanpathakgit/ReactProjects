
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

export function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields to sign up.');
            return;
        }

        if (email !== confirmEmail) {
            setError('Email and confirm email do not match.');
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');
        alert('Sign up successful! You are now logged in.');
        navigate('/book');
    };

    return (
        <section className="section book-page">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>

                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                    />
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </label>

                <label>
                    Confirm Email
                    <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        placeholder="Confirm your email"
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        required
                    />
                </label>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </section>
    );
}