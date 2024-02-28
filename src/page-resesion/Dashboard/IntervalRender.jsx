import moment from "moment";

const IntervalRenderer = ({ intervalContext, getIntervalProps, data }) => {
    const label = intervalContext.intervalText;
    

    return (
    <div
        {...getIntervalProps()}
        className={`rct-dateHeader bg-gray ${
        data.isMonth ? "" : ""
        }`}
        onClick={() => {
            return false;
        }}>
        <span
        style={{
            position:"relative",
            
            padding: "0 10rem",
            textTransform: "capitalize",
            color: "#b3aca7",
            left: "20%;",
            fontWeight:"700",
            zIndex:1,
        }}
        >
        {intervalContext.intervalText}
        </span>
    </div>
    );
}

export default IntervalRenderer