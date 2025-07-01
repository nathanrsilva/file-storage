'use client'

function AuthError({error}: {error: Error}) {
    return (
        <div>AuthError: {error.message}</div>
    )
}

export default AuthError