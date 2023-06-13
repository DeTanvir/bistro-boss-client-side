// react helmet
import { Helmet } from "react-helmet-async";
// imported css
import './Login.css'

// for react simple captcha
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {

    // hook for collecting captcha value
    // const captchaRef = useRef(null);

    // for disabling the login button
    const [disabled, setDisabled] = useState(true);


    // to use [functions] from AuthContext
    const { signIn } = useContext(AuthContext);

    // for location
    const location = useLocation();
    // console.log(location);
    //redirecting location
    const from = location.state?.from?.pathname || '/';
    // for navigate to another route
    const navigate = useNavigate();


    // for loading captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    // form submit operation
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // call the signIn function
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // for [sweet-alert] on login
                Swal.fire({
                    title: 'User successfully logged in',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                // to navigate to the home route
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }

    // captcha validation operation
    const handleValidateCaptcha = (e) => {
        // to get captcha value
        const user_captcha_value = e.target.value;
        // captcha validation condition & disabled button
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200 login">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="emaill" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    {/* for captcha */}
                                    <LoadCanvasTemplate />
                                </label>
                                {/* custom hook for getting captcha value in the next line */}
                                <input type="text" onBlur={handleValidateCaptcha} name="captcha" placeholder="type the captcha above" className="input input-bordered" />
                                {/* captcha validation button */}
                                {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </div>
                        <p className="text-center text-[#D1A054] my-2"><small>New to Bistro Boss? <Link to="/signup" className="font-bold">Create an account</Link></small></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;