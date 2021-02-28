import { signIn, signOut } from 'next-auth/client';

type TProps = {
    isSignedIn: boolean;
};

const SignInButtons = ({ isSignedIn }: TProps) => {
    const handleSignIn = () => {
        signIn();
    };
    const handleSignOut = () => {
        signOut();
    };
    return (
        <div>
            {!isSignedIn && <button onClick={handleSignIn}>Sign in</button>}
            {isSignedIn && <button onClick={handleSignOut}>Sign out</button>}
            <style jsx>{`
                div {
                    margin: 15px;
                }
                .light {
                    background-color: #999;
                }
            `}</style>
        </div>
    );
};

export default SignInButtons;
