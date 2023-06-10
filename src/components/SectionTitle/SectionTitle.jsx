
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="w-4/12 md:mx-auto my-10 text-center">
            <p className="text-yellow-600 py-2">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase border-y-4 py-6">{heading}</h3>
        </div>
    );
};

export default SectionTitle;