import LogElement from "../LogElement/LogElement";
import "./Log.css";

const Log = ({ timestamp, logLevel, transactionId, errorMessage }) => {
    return (
        <div className="log">
            <LogElement logKey={"Timestamp"} logValue={timestamp} />
            <LogElement logKey={"Log Level"} logValue={logLevel} />
            <LogElement logKey={"Transaction ID"} logValue={transactionId} />
            <LogElement logKey={"Error"} logValue={errorMessage} />
        </div>
    )
}

export default Log;