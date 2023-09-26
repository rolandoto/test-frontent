const IntervalRenderer = ({ intervalContext, getIntervalProps, data }) => {
    return (
    <div
        {...getIntervalProps()}
        className={`rct-dateHeader ${
        data.isMonth ? "rct-dateHeader-primary" : ""
        }`}
        onClick={() => {
            return false;
        }}>
        <span
        style={{
            position:"absolute",
            margin: "auto",
            padding: "0 10rem",
            textTransform: "capitalize",
            color: "#b3aca7",
            left: "48%;",
            fontWeight:"100",
            zIndex:1
        }}
        >
        {intervalContext.intervalText}
        </span>
    </div>
    );
}

export default IntervalRenderer