import { useEffect, useState } from "react";

const easeOutQuad = (t, b, c, d) => {
    t = t > d ? d : t / d;
    return Math.round(-c * t * (t - 2) + b);
  };
  
const UseCountNumber =({value,start=0,duration=800}) =>{

    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTime = 0
        const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const timePassed = timestamp - startTime;
        const progress = timePassed / duration;
        const currentCount = easeOutQuad(progress, 0, value, 1);
        if (currentCount >= value) {
            setCount(value);
            return;
        }
        setCount(currentCount);
        requestAnimationFrame(animateCount);
        };
        requestAnimationFrame(animateCount);
    }, [value, duration]);


    return [count]


}

export default UseCountNumber