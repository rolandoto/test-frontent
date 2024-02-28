import moment from "moment";

const intervalRendererdayNum= ({ getIntervalProps, intervalContext ,data }) => {

    const label = intervalContext.intervalText;
    const currentDate = moment().startOf("day");
    const isToday = moment(label, "D").isSame(currentDate, "day");

    return (
        <div
        {...getIntervalProps()}
        className={`day-num ${isToday ? "todayOne-end-one" : "todayOne"}   rct-dateHeader ${
        data.isMonth ? "rct-dateHeader-primary" : ""
        }`}

        onClick={() => {
            return false;
        }}>
        <span
        style={{
            position:"absolute",
            margin: "auto",
            padding: "0 50rem",
            textTransform: "capitalize",
            color: "#b3aca7",
            left: "48%;",
            fontWeight:"100",
            fontSize:"12px",
            zIndex:1,
            top:"1px",
            marginLeft:"-13px"
        }}
        
        >
         <span className={` day-num ${isToday && "color-day"}`} > {label}</span>
       
        </span>
       
    </div>
    );
}
    

export default intervalRendererdayNum