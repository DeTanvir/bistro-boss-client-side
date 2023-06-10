// react helmet(dynamic title) 
import { Helmet } from 'react-helmet-async';

// imported images
import menuBg from '../../../assets/menu/menu-bg.jpg'
import dessertBg from '../../../assets/menu/dessert-bg.jpg'
import pizzaBg from '../../../assets/menu/pizza-bg.jpg'
import saladBg from '../../../assets/menu/salad-bg.jpg'
import soupBg from '../../../assets/menu/soup-bg.jpg'

import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import Cover from '../../Shared/Cover/Cover';



const Menu = () => {
    // for menu data from api
    const [menu] = useMenu();
    // filtering different data for different menu
    const offered = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soups = menu.filter(item => item.category === 'soup');
    const salads = menu.filter(item => item.category === 'salad');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* for offered menu with main cover image */}
            <Cover img={menuBg} title='Our Menu' text='WOULD YOU LIKE TO TRY A DISH?'></Cover>
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* for dessert menu */}
            <MenuCategory items={desserts} title='desserts' img={dessertBg}></MenuCategory>
            {/* for pizza menu */}
            <MenuCategory items={pizza} title='pizza' img={pizzaBg}></MenuCategory>
            {/* for salad menu */}
            <MenuCategory items={salads} title='salads' img={saladBg}></MenuCategory>
            {/* for soup menu */}
            <MenuCategory items={soups} title='soups' img={soupBg}></MenuCategory>
        </div>
    );
};

export default Menu;