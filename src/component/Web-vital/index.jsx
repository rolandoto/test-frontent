
import { motion } from "framer-motion";
import CountingNumbers from "../../hooks/UseCountin-numbers";
import UseCountNumber from "../../hooks/UseCountNumber";




export default function WebVitals({value=0}) {

  const [count] = UseCountNumber({value})

  const radius = 45; // Radio del círculo
  const circumference = 2 * Math.PI * radius; // Circunferencia del círculo
  const desiredStrokeLength = (count / 100) * circumference

  return (
    <div className="container-webVitals">
       <motion.svg
      viewBox="0 0 100 100"
      width={180}
      height={180}
    >
      <motion.circle
       initial={{ pathLength: 0 }}
       animate={{ pathLength: 1 }}
       whileInView={{ pathLength: 1 }}
       viewport={{ once: true }}
       transition={{ delay: 0.10, duration: 1, }}
       strokeWidth={7}
       strokeDasharray={`${desiredStrokeLength} ${circumference}`} // Ajuste para centrar el porcentaje
       strokeLinecap="round"
       transform="rotate(-90 50 50)"
       cx="50"
       cy="50"
       custom={10}
       r={radius}
       fill="#DCFCE7"
       stroke="#22C55E"
      />
    </motion.svg>
      <CountingNumbers
        value={value}
        duration={2500}
        className="absolute end-0	  top-10	 right-0	 left-0	 	 mx-auto flex items-center justify-center font-display text-5xl text-green-400"
      />

    </div>
  );
}