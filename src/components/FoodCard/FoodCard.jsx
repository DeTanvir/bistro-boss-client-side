import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    // contextApi for user
    const { user } = useContext(AuthContext);
    // import [refetch] from useCart, to start the [useCart] function after every food-item added
    const [,refetch] = useCart();

    // to get location
    const location = useLocation();
    // to navigate to other route
    const navigate = useNavigate();

    // handling addToCart 
    const handleAddToCart = item => {
        console.log(item);
        if (user && user?.email) {
            // to send user and item information to cart
            const cartItem = {menuItemId: _id, name, price, image, email: user.email};

            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        // to restart the [useCart] function after an item added[77-5: 06:00]
                        refetch();
                        Swal.fire({
                            title: 'Food item add to the cart successfully',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                })
        }
        // if user is not logged in
        else {
            Swal.fire({
                title: 'You need to login first. Wanna login?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        // another way to navigate
                        navigate('/login', { state: { from: location } })
                    )
                }
            })
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="food" /></figure>
            <p className="bg-slate-900 text-white absolute right-4 top-4 px-2 py-1 rounded-sm">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 text-orange-400 border-0 border-orange-400 border-b-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;