import { providers, signIn, getCsrfToken } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../components/layout';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        link: {
            textDecoration: 'none',
        },
        input: {
            margin: '10px',
        },
    })
);

export interface ISignInProps {
    providers: IProvider | undefined;
    csrfToken: string | undefined;
}

export interface IProvider {
    name: string;
    id: string;
    signinUrl: string;
}

export default function SignIn({ providers, csrfToken }: ISignInProps) {
    const classes = useStyles();
    const newProvider = Object.values(providers).filter(
        (el) => el.id != 'email'
    );
    console.log(newProvider);

    const {
        query: { callbackUrl },
    }: any = useRouter();

    return (
        <>
            <Layout title="Sign in">
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {newProvider.map((provider) => (
                                <div key={provider.name}>
                                    <Paper className={classes.paper}>
                                        <a
                                            className={classes.link}
                                            href={provider.signinUrl}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="outlined"
                                                onClick={() =>
                                                    signIn(provider.id, {
                                                        callbackUrl,
                                                    })
                                                }
                                            >
                                                Sign in with {provider.name}
                                            </Button>
                                        </a>
                                    </Paper>
                                </div>
                            ))}
                            <Paper className={classes.paper}>
                                <form
                                    method="post"
                                    action="/api/auth/signin/email"
                                >
                                    <input
                                        name="csrfToken"
                                        type="hidden"
                                        defaultValue={csrfToken}
                                    />
                                    <label>
                                        Email address
                                        <input
                                            className={classes.input}
                                            type="email"
                                            id="email"
                                            name="email"
                                        />
                                    </label>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Sign in with Email
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Layout>
        </>
    );
}
export async function getServerSideProps(context: any) {
    const csrfToken = await getCsrfToken(context);

    return { props: { providers: await providers(), csrfToken } };
}
