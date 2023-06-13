import { useContext } from "react";
// for helmet
import { Helmet } from "react-helmet-async";
// for sweet alert
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {

    // importing create user from [AuthContext]
    const { createUser, updateUserProfile } = useContext(AuthContext);

    // for react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // for navigate to another route
    const navigate = useNavigate();

    // form: on submit function
    // this [react-hook-form] automatically collects data from the [form]
    const onSubmit = data => {
        console.log(data);

        // [signUp/createUser] function
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // [update-user-photo] function to update photo
                updateUserProfile(data.name, data.photo)
                    .then(() => {

                        // [variable] for sending data by [post-method]
                        const saveUser = {name: data.name, email: data.email};

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

                                // [reset():form] and [sweetAlert] only after user posted to DB
                                // to reset the form
                                reset();
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
                        })
                    })
                    .catch(err => console.log(err))

            })
            // to navigate [home('/)] after signUp
            navigate('/');
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Please Sign Up!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {/* errors will return when field validation fails  */}
                                {errors.name && <span className="text-red-600 font-semibold my-1">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photo", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {/* errors will return when field validation fails  */}
                                {errors.photo && <span className="text-red-600 font-semibold my-1">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {/* errors will return when field validation fails  */}
                                {errors.email && <span className="text-red-600 font-semibold my-1">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                {/* password input with [react-hook-form] validation */}
                                <input type="password" name="password" {...register("password",
                                    {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="password" className="input input-bordered" />
                                {/* another system of showing errors */}
                                {errors.password?.type === 'required' && <p className="text-red-600 font-semibold py-1">Password is required</p>}
                                {/* error for [minLength] */}
                                {errors.password?.type === 'minLength' && <p className="text-red-600 font-semibold py-1">Password must be at least 6 characters</p>}
                                {/* error for [maxLength] */}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600 font-semibold py-1">Password must be less than 20 characters</p>}
                                {/* error for [pattern] */}
                                {errors.password?.type === 'pattern' && <p className="text-red-600 font-semibold py-1">Password must contain at least one uppercase, one lowercase, one number and one special character</p>}


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* social login */}
                            <div className="form-control mt-6">
                                <SocialLogin></SocialLogin>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Sign Up" />
                            </div>
                            <p className="text-center text-[#D1A054] my-2"><small>Already conneted? <Link to="/login" className="font-bold">Login here</Link></small></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;