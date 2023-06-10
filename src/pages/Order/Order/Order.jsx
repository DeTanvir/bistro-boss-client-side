// react helmet(dynamic title) 
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
// for react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// imported images
import orderCoverImg from '../../../assets/shop/banner2.jpg'

import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    // using parameters(params) of dymanic route(`order/:category`)
    const categories = ['salad', 'pizza', 'soups', 'desserts', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);//it determines which index of const category is the same as 'the category inside params'
    // for react-tabs
    const [tabIndex, setTabIndex] = useState(initialIndex);
    // for menu data from api
    const [menu] = useMenu();




    // filtering different data for different menu
    const drinks = menu.filter(item => item.category === 'drinks');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soups = menu.filter(item => item.category === 'soup');
    const salads = menu.filter(item => item.category === 'salad');

    return (
        <div className='my-6'>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover title='Order Food' text='WOULD YOU LIKE TO TRY A DISH?' img={orderCoverImg}></Cover>

            {/* react tabs */}
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="text-center my-10">
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salads}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soups}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;