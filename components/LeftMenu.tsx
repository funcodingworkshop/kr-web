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
import Divider from '@material-ui/core/Divider';
import { ListItem } from '@material-ui/core';
import SignInButtons from './auth/sign_in_buttons';
import { ELoggedIn } from '../types/ELoggedIn';
import { teal } from '@material-ui/core/colors';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: '80px',
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
            background: teal[100],
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
        link: {
            textDecoration: 'none',
            color: 'inherit',
        },
    })
);

type TProps = {
    currentUser: string | undefined;
    currentEmail: string | undefined;
    currentId: string | undefined;
    currentRole: string;
    isLoggedIn: any;
};

export default function LeftMenu({
    currentUser,
    currentEmail,
    currentId,
    currentRole,
    isLoggedIn,
}: TProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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
                <Divider />
                <List>
                    <ListItem button key={PAGES.homepage.path}>
                        <HomeOutlinedIcon />
                        <Link href={PAGES.homepage.path}>
                            <a className={classes.link}>
                                <ListItemText primary={PAGES.homepage.title} />
                            </a>
                        </Link>
                    </ListItem>
                    {currentRole === 'student' && (
                        <ListItem button key={PAGES.profile.path}>
                            <SchoolOutlinedIcon />
                            <Link href={PAGES.profile.path}>
                                <a className={classes.link}>
                                    <ListItemText
                                        primary={PAGES.profile.title}
                                    />
                                </a>
                            </Link>
                        </ListItem>
                    )}
                    <ListItem button key={PAGES.testRedux.path}>
                        <CropFreeOutlinedIcon />
                        <Link href={PAGES.testRedux.path}>
                            <a className={classes.link}>
                                <ListItemText primary={PAGES.testRedux.title} />
                            </a>
                        </Link>
                    </ListItem>

                    <ListItem button key={PAGES.testMongo.path}>
                        <CropFreeOutlinedIcon />
                        <Link href={PAGES.testMongo.path}>
                            <a className={classes.link}>
                                <ListItemText primary={PAGES.testMongo.title} />
                            </a>
                        </Link>
                    </ListItem>
                    {currentRole === 'admin' && (
                        <ListItem button key={PAGES.adminpage.path}>
                            <SupervisorAccountOutlinedIcon />
                            <Link href={PAGES.adminpage.path}>
                                <a className={classes.link}>
                                    <ListItemText
                                        primary={PAGES.adminpage.title}
                                    />
                                </a>
                            </Link>
                        </ListItem>
                    )}
                    {currentRole !== 'student' && (
                        <ListItem button key={PAGES.tutorpage.path}>
                            <SupervisorAccountOutlinedIcon />
                            <Link href={PAGES.tutorpage.path}>
                                <a className={classes.link}>
                                    <ListItemText
                                        primary={PAGES.tutorpage.title}
                                    />
                                </a>
                            </Link>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
}
