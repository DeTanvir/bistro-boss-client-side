import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = ({task}) => {
    // to use [functions] from AuthContext
    const { googleSignIn } = useAuth();

    // // for location
    const location = useLocation();
    // // console.log(location);
    //redirecting location
    const from = location.state?.from?.pathname || '/';
    // for navigate to another route
    const navigate = useNavigate();



    // google signIn
    const handleGoogleSignIn = () => {
        
        googleSignIn()
            .then(result => {

                const loggedInUser = result.user;
                console.log(loggedInUser);

                // [variable] for sending data by [post-method]
                const saveUser = {name: loggedInUser.displayName, email: loggedInUser.email};

                // for posting [user] to DB
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId) {
                        // for [sweet-alert] on signUp
                        Swal.fire({
                            title: 'User created successfully',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                    // to navigate to the home route
                    navigate(from, { replace: true });
                })
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className='w-full mb-2 btn btn-warning bg-amber-400'>
                    <FaGoogle className="text-[#EA4335] me-2"></FaGoogle> <span className="text-white">{task} with Google
                </span></button>
            </div>
        </div>
    );
};

export default SocialLogin;