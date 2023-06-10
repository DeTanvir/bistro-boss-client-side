// for react parallax from npm
import { Parallax } from 'react-parallax';


const Cover = ({ img, title, text }) => {
    return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-200}
    >
        {/* this is inside parallax item */}
        <div className="hero h-[700px]">
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md bg-black bg-opacity-40 px-16 py-12">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">{text ? text : 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.'}</p>
                </div>
            </div>
        </div>
        {/* parallax item end */}
    </Parallax>
        
    );
};

export default Cover;