
const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="food" /></figure>
            <p className="bg-slate-900 text-white absolute right-4 top-4 px-2 py-1 rounded-sm">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-outline bg-slate-100 text-orange-400 border-0 border-orange-400 border-b-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;