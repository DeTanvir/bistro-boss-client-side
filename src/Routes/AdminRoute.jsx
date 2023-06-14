import { Navigate, useLocation } from 'react-router-dom';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // following [states] is for checking whether the user is admin or not
    const [isAdmin, isAdminLoading] = useAdmin();

    // to catch the location
    const location = useLocation();
    // console.log(location);

    // loader/spinner on data load
    if (loading || isAdminLoading) {
        return <div className='text-center'>
            <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": 70 }}>70%</div>
        </div>
    }
    else if (user) {
        return children;
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have to log in first to go there.',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        return < Navigate to={'/login'} state={{ from: location }} replace></Navigate >
    }
};

export default AdminRoute;

