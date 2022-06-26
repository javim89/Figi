import React, { useState } from "react";
import { signIn, getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onSubmitForm = async () => {
        const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
            callbackUrl: "/products",
        });
    }

    return (
        <form>
            <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
            />
            <input name="username" onChange={(e) => setUsername(e.target.value)} />
            <input name="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onSubmitForm} type="button">Submit</button>
        </form>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}