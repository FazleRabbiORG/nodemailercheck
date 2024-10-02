// app/send-email/page.js
'use client';

import { useState } from 'react';

export default function SendEmailPage() {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        text: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
        if (response.ok) {
            setMessage('Email sent successfully!');
        } else {
            setMessage('Failed to send email.');
        }
    };
    return (
        <div>
            <h1>Send an Email</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="to"
                    placeholder="Recipient's email"
                    value={emailData.to}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={emailData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="text"
                    placeholder="Message"
                    value={emailData.text}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Send Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}