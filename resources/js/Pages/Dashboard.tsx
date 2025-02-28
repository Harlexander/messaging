import KingschatMessageForm from '@/Components/KingschatMessageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import KingsChatWebSdk from 'kingschat-web-sdk';
import { authenticationTokenResponseI } from 'kingschat-web-sdk/dist/ts/interfaces';
import { useState } from 'react';
export default function Dashboard() {
    const [loginData, setLoginData] = useState<authenticationTokenResponseI | null>(null);

    const login = async () => {
        const result = await KingsChatWebSdk.login({
            clientId: "3d6ff64c-7b41-4b8d-a92c-bb51df27222e",
            scopes: ['send_chat_message'],
        });
        setLoginData(result);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <KingschatMessageForm loginData={loginData} loginWithKingsChat={login} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
