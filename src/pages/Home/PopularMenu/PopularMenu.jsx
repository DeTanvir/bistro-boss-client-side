import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="text-center">
            <SectionTitle
                subHeading="Check it out"
                heading="From Our Menu"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-2">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;