import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';

const Main = () => {
    // to remove navbar and footer from login page, we need location
    const location = useLocation();
    // for the logic of conditional rendering
    // const noHeaderFooter = location.pathname.includes('login' || 'signup'); //this won't work
    // this will work
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup') ;

    
    return (
        <div>
            {noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;