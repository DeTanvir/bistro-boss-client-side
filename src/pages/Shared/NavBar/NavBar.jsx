import { useContext } from "react";
// for sweet alert
import Swal from 'sweetalert2'
// react-icons / font-awesome
import { FaShoppingCart } from 'react-icons/fa';


import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCart from "../../../hooks/useCart";

const NavBar = () => {

    // import [user] from [AuthContext]
    const { user, logOut } = useContext(AuthContext);
    // get data from hook useCart
    const [cart] = useCart();

    // logOut function
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Logged Out',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>

        {/* by default the following link shows salad items */}
        <li><Link to="/order/salad">Order Food</Link></li>
        <li><Link to="/secret">Secret</Link></li>
        <li>
            {/* this li is linked to dashboard-mycart */}
            <Link to="/dashboard/mycart">
                <button className="btn">
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+{cart?.length || 0}</div>
                </button>
            </Link>
        </li>

        {
            user ?
                <>
                    {/* <span>{user?.displayName}</span> */}
                    <button onClick={handleLogOut} className="btn-ghost">Log Out</button>
                </> :
                <> <li><Link to="/login">Login</Link></li> </>
        }
    </>

    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link className="uppercase text-center ms-2" to='/'><span className="text-xl font-bold">Bistro Boss</span><br />Restaurant</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;