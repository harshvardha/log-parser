import "./LogElement.css";

const LogElement = ({ logKey, logValue }) => {
    return (
        <div className="logDetail">
            <h3>{logKey}: </h3>
            <p>{logValue || "none"}</p>
        </div>
    )
}

export default LogElement;