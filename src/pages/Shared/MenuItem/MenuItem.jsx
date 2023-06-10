
const MenuItem = ({ item }) => {
    const { name, recipe, image, price} = item;
    return (
        <div className="flex space-x-2 my-10">
            <img className="w-[105px]" style={{borderRadius: "0 200px 200px 200px"}} src={image} alt="" />
            <div>
                <h3 className="text-2xl uppercase">{name}--------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;