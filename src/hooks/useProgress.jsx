import { useEffect, useState } from "react";


const useProgress =({id}) =>{

    const [progress, setProgress] = useState(0);

      useEffect(() => {
          const timer = setInterval(() => {
            setProgress((oldProgress) => {
              const diff = Math.random() * 100;
              return Math.min(oldProgress + diff, 100);
            });
          }, 100);
      
          return () => {
            clearInterval(timer);
          };
        }, [id]);

      return {progress}

}

export default useProgress