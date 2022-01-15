import NavigationActions from './NavigationActions/NavigationActions';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
    return (
        <>
            <header className="fixed flex justify-between py-3 px-7 left-0 right-0 sm:left-0 md:left-[12rem] lg:left-[15rem]">
                <NavigationActions />
                <UserMenu />
            </header>
        </>
    );
};

export default Header;
