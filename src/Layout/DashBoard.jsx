import { Link, Outlet } from "react-router-dom";
// react-icons / font-awesome
import { FaCalendarAlt, FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa';


const DashBoard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                {/* Outlet for DashBoard route */}
                <Outlet></Outlet>
                {/* [oper drawer button for mobile device] */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link to="/dashboard/mycart"><FaHome></FaHome> User Home</Link></li>
                    <li><Link to="/dashboard/mycart"><FaCalendarAlt></FaCalendarAlt> Reservations</Link></li>
                    <li><Link to="/dashboard/mycart"><FaWallet></FaWallet> Payment History</Link></li>
                    <li><Link to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart> My Cart</Link></li>
                    
                    {/* Divider from daisyUI */}
                    <div className="divider"></div>

                    <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                    <li><Link to="/menu">Our Menu</Link></li>
                    {/* by default the following link shows salad items */}
                    <li><Link to="/order/salad">Order Food</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;