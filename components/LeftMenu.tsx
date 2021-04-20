import React from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import { PAGES } from '../constants/pages';
import { Button, ListItem } from '@material-ui/core';
import SignInButtons from './auth/sign_in_buttons';
import { useSelector } from 'react-redux';
import { IRootState } from '../redux/reducers';
import { ELoggedIn } from '../types/ELoggedIn';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function LeftMenu() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const currentUser = useSelector(
        (state: IRootState) => state.app.currentUser
    );
    const currentEmail = useSelector(
        (state: IRootState) => state.app.currentEmail
    );
    const currentId = useSelector((state: IRootState) => state.app.currentId);
    const currentRole = useSelector(
        (state: IRootState) => state.app.currentRole
    );
    const isLoggedIn = useSelector((state: IRootState) => state.app.isLoggedIn);
    console.log({ isLoggedIn });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        THE SEED
                    </Typography>
                    {isLoggedIn === ELoggedIn.True && (
                        <div>
                            Signed in as {currentUser} with {currentEmail} your
                            role is {currentRole}
                        </div>
                    )}
                    {isLoggedIn !== ELoggedIn.Unknown && (
                        <SignInButtons
                            isSignedIn={isLoggedIn === ELoggedIn.True}
                        />
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    <ListItem button key={PAGES.homepage.path}>
                        <ListItemText primary={PAGES.homepage.title} />
                    </ListItem>
                    <div className="menuItem">
                        <Link href={PAGES.profile.path}>
                            <a>{PAGES.profile.title}</a>
                        </Link>
                    </div>
                    <div className="menuItem">
                        <Link href={PAGES.testRedux.path}>
                            <a>{PAGES.testRedux.title}</a>
                        </Link>
                    </div>
                    <div className="menuItem">
                        <Link href={PAGES.testMongo.path}>
                            <a>{PAGES.testMongo.title}</a>
                        </Link>
                    </div>
                    <div className="menuItem">
                        <Link href={PAGES.adminpage.path}>
                            <a>{PAGES.adminpage.title}</a>
                        </Link>
                    </div>
                    <div className="menuItem">
                        <Link href={PAGES.tutorpage.path}>
                            <a>{PAGES.tutorpage.title}</a>
                        </Link>
                    </div>
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit adipiscing bibendum est
                    ultricies integer quis. Cursus euismod quis viverra nibh
                    cras. Metus vulputate eu scelerisque felis imperdiet proin
                    fermentum leo. Mauris commodo quis imperdiet massa
                    tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                    At augue eget arcu dictum varius duis at consectetur lorem.
                    Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
            </main>
        </div>
    );
}
