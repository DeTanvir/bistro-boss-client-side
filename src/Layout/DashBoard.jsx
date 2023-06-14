import { NavLink, Outlet } from "react-router-dom";
// react-icons / font-awesome
import { FaBook, FaCalendarAlt, FaHamburger, FaHome, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import SectionTitle from "../components/SectionTitle/SectionTitle";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const DashBoard = () => {
    // get data from hook useCart
    const [cart] = useCart();

    // TODO: load [user-data] from server to have dynamic [isAdmin] based on data
    // checks whether a user is admin or not
    // const isAdmin = true;
    // after using [useAdmin] hook, by asios and react-query
    const [isAdmin] = useAdmin();

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-[#FCF7F7]">
                    {/* Page content here */}
                    <SectionTitle
                        subHeading="My Cart"
                        heading="Wanna Add More?"
                    ></SectionTitle>
                    {/* Outlet for DashBoard route */}
                    <Outlet></Outlet>
                    {/* [oper drawer button for mobile device] */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {/* background of [following ul] is the background of the [side-drawer] */}
                    <ul className="menu p-4 w-80 h-full bg-[#D1A054] text-base-content">
                        {/* Sidebar content here */}

                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/home"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservations"><FaUtensils></FaUtensils> Add Item</NavLink></li>
                                <li><NavLink to="/dashboard/historyP"><FaWallet></FaWallet> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/historyP"><FaBook></FaBook> Manage Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaUsers></FaUsers> All Users</NavLink></li>
                                </> : <>
                                <li><NavLink to="/dashboard/home"><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservations"><FaCalendarAlt></FaCalendarAlt> Reservations</NavLink></li>
                                <li><NavLink to="/dashboard/historyP"><FaWallet></FaWallet> Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/mycart">
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart
                                    <span className="badge badge-secondary">+{cart?.length || 0}</span>
                                </NavLink></li>
                            </>
                        }


                        {/* Divider from daisyUI */}
                        <div className="divider"></div>

                        <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                        <li><NavLink to="/menu"><FaHamburger></FaHamburger> Our Menu</NavLink></li>
                        {/* by default the following NavLink shows salad items */}
                        <li><NavLink to="/order/salad"><FaShoppingBag></FaShoppingBag> Order Food</NavLink></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashBoard;