import { signIn, signOut } from 'next-auth/client';
import { Button } from '@material-ui/core';

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
            {!isSignedIn && (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSignIn}
                >
                    Sign in
                </Button>
            )}
            {isSignedIn && (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSignOut}
                >
                    Sign out
                </Button>
            )}
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
