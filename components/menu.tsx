import Link from 'next/link';
import { PAGES } from '../constants/pages';

const Menu = () => {
    return (
        <div className="menuItemBlock">
            <div>MENU</div>
            <div className="menuItem">
                <Link href={PAGES.homepage.path}>
                    <a>{PAGES.homepage.title}</a>
                </Link>
            </div>
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

            <style jsx>{`
                .menuItemBlock {
                    padding: 16px;
                    background-color: lightgray;
                    margin-bottom: 10px;
                }
                .menuItem {
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default Menu;
