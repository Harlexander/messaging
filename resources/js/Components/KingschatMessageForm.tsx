import React, { useState } from 'react';
import axios from 'axios';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import kingsChatWebSdk from 'kingschat-web-sdk';
import { authenticationTokenResponseI } from 'kingschat-web-sdk/dist/ts/interfaces';
import 'kingschat-web-sdk/dist/stylesheets/style.min.css';

const KingschatMessageForm = ({ loginData, loginWithKingsChat }: { loginData: authenticationTokenResponseI | null, loginWithKingsChat: () => void }) => {
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
    const [refreshTokenData, setRefreshTokenData] = useState<authenticationTokenResponseI | null>(null);
    

    console.log(loginData);

    const sendMessage = (e: React.FormEvent) => {
        if (!loginData) {
            loginWithKingsChat();
            return;
        }

        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        kingsChatWebSdk.sendMessage({
            message: "Hello, how are you?",
            userIdentifier: "alexanderd8980",
            accessToken: loginData?.accessToken
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error sending message:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.'
            });
            setLoading(false);
        });
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Kingschat Message</h2>
            <form onSubmit={sendMessage}>
                <div className="mb-4">
                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                    <TextInput
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full"
                        required
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="message" value="Message" />
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows={4}
                        required
                        placeholder="Enter your message"
                    />
                </div>

                {status.message && (
                    <div className={`mb-4 p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {status.message}
                    </div>
                )}

                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </PrimaryButton>


                <a className="kc-web-sdk-btn" onClick={loginWithKingsChat} />
            </form>
        </div>
    );
};

export default KingschatMessageForm; 