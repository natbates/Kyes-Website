import "../styles/loading.css";

const Loading = ({ className, delay}) => {
    return (
        <div
            style={{ animationDelay: delay }}
            className={`${delay} loader ${className}`}
        ></div>
    );
};


export default Loading;