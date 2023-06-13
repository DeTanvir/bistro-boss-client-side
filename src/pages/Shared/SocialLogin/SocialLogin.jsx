import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    // to use [functions] from AuthContext
    const { googleSignIn } = useContext(AuthContext);

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
                fetch('https://bistro-boss-server-ten-swart.vercel.app/users', {
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
                <button onClick={handleGoogleSignIn} className='w-full mb-2 btn btn-primary bg-orange-400'>
                    <FaGoogle className="text-orange-900 me-2"></FaGoogle> Signin with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;