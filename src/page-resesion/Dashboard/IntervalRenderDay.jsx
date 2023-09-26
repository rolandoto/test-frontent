import moment from "moment";

const intervalRendererday = ({ getIntervalProps, intervalContext, data }) => {
				
    const label = intervalContext.intervalText;
    const currentDate = moment().startOf('day');
    const isToday = moment(label, 'dd D').isSame(currentDate, 'day');
    const isThursday = moment(label, 'dd D').isoWeekday() === 4; // 4 es el código ISO para el jueves
    const isFirstThursdayOfMonth = moment(label, 'dd D').date() && isThursday;
  
    const acum = [];
  
    
    if (isToday) {
      acum.push(0);
    }
  
    let acumlitor = 0;
  
    if (acum.length === 1) {
      acumlitor++;
    }
  
    const dayOfWeek = moment(label, 'dd D').locale('es').format('ddd');

  
    return (
      <div
        {...getIntervalProps()}
        className={`day-num ${acum.length === 1 ? 'todayOne-end' : 'todayOne-Finsihs'} rct-dateHeader ${
          data.isMonth ? 'rct-dateHeader-primary' : ''
        }`}
      >
        <span
          style={{
            position: 'relative',
            margin: 'auto',
            padding: '0 50rem',
            textTransform: 'uppercase',
            color: '#b3aca7',
            fontWeight: '100',
            fontSize: '13px',
            textAlign: 'center', // Ajusta el texto al centro
            display:"grid",
            justifyContent:"center",
            left:"13px",
            top: '10px',
            zIndex: 1,
          }}
        >
         <span  className={` day-num ${acum.length === 1  ? "color-day " : ""} `}   > { dayOfWeek}</span>   
        </span>
      </div>
    );
  };


  export default intervalRendererday