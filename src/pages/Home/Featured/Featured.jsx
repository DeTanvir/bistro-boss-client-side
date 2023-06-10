import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import './Featured.css';

import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {

    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
                subHeading="Check it out"
                heading="Featured Item"
            ></SectionTitle>
            <div className="md:flex space-x-4 justify-center items-center bg-slate-200 bg-opacity-40 px-20 pb-20 pt-12">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div>
                    <p className="text-xl">23 September, 2025</p>
                    <p className="text-xl uppercase">Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam dolore laboriosam eaque eligendi itaque aspernatur consequuntur voluptates debitis dolores velit quaerat distinctio, totam voluptatem neque repudiandae error reprehenderit hic obcaecati. Accusantium iure facilis cupiditate similique saepe, aliquam sit molestiae quasi animi odio reiciendis vero, sed perferendis temporibus et, ipsam rem?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-2">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;