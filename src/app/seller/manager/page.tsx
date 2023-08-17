'use client'
import {NextPage} from "next";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import Paragraph from "@/components/ui/Paragraph";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {styled} from "@mui/system";
import {useEffect} from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from "@mui/material";
import TourManager from "@/components/seller/tourManager";

const drawerWidth = 240;

interface PageProps {

    window?: () => Window;
}

interface MenuItem {
    id: number;
    title: string;
    icon: JSX.Element;
    onClick: () => void;
    active: boolean; // Add this property
}

const Page: NextPage<PageProps> = (props: PageProps) => {
    const role = useSelector((state) => state.auth.value?.user.role)
    const user = useSelector((state) => state.auth.value?.user)
    const router = useRouter()
    const {window} = props;
    const [selectedComponent, setSelectedComponent] = React.useState('Tour'); // Default selected component

    const HomeContent = () => <div>Home Component Content</div>;
    const TourContent = () => <div>Tour Component Content</div>;
    const MailContent = () => <div>Mail Component Content</div>;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = (component) => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (component) => {
        handleDrawerToggle(component);
        setSelectedComponent(component);
    };
    const [menuItem, setMenuItem] = React.useState<MenuItem[]>([
            {
                id: 1,
                title: 'Home',
                icon: <HomeIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('Home'),
                active: selectedComponent === 'Home',
            },
            {
                id: 2,
                title: 'Tour',
                icon: <AirplanemodeActiveIcon sx={{color: 'black'}}/>,
                onClick: () => handleMenuItemClick('Tour'),
                active: selectedComponent === 'Tour',
            },
        ]
    )
    useEffect(() => {
        const updatedMenuItems = menuItem.map(item => ({
            ...item,
            active: item.title === selectedComponent,
        }));
        setMenuItem(updatedMenuItems);
    }, [selectedComponent])
    const drawer = (
        <div>
            <div className={'font-bold p-2'}>
                <Link href={'/'} className={'flex justify-center items-center'}>
                    <PeopleAltIcon sx={{marginRight: '4px'}}/>
                    <Paragraph size={'md'} className={'font-bold my-[12px] hover:text-blue-400 hover:underline'}>User
                        Page</Paragraph>
                </Link>
            </div>
            <Divider/>
            <List>
                {menuItem.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            onClick={item.onClick}
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: '4px',
                                color: item.active ? theme => theme.palette.primary.main : theme => theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: theme => theme.palette.primary.main,
                                    color: theme => theme.palette.common.white,
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={(item.title)}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return role === 'seller' ? (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {lg: `calc(100% - ${drawerWidth}px)`},
                    ml: {lg: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {lg: 'none'},}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography width={'100%'} variant="h6" noWrap component="div">
                        <div className={'flex justify-between items-center'}>
                            <div>
                                {selectedComponent === 'Home' && 'Home '}
                                {selectedComponent === 'Tour' && 'Tour '}
                                {selectedComponent === 'Mail' && <MailContent/>}
                            </div>
                            <div className={'flex mr-6'}>
                                <div className={'ml-3 cursor-pointer hover:text-gray-950'}>
                                    <Avatar  sx={{ backgroundColor: 'red' }} alt="store" src={user.store.imgUrl} />
                                </div>
                                <div className={'ml-3 flex items-center'}>
                                    <Paragraph className={'cursor-default mb-0 '} size={'sm'}>{user.store.name}</Paragraph>
                                </div>
                                <div className={'ml-6 cursor-pointer hover:text-gray-950'}>
                                    <Tooltip title="Log out">
                                    <LogoutIcon/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {lg: drawerWidth}, flexShrink: {lg: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', lg: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', lg: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                <div>
                    {selectedComponent === 'Home' && <HomeContent/>}
                    {selectedComponent === 'Tour' && <TourManager/>}
                    {selectedComponent === 'Mail' && <MailContent/>}
                </div>
            </Box>
        </Box>
    ) : router.push('/seller');
}

export default Page;