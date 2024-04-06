import { useContext, useEffect, useState } from "react";
import CryptoTable from "../../Components/CryptoTable/CryptoTable.component";
import { details } from "../../Data/coins";
import { Quotes } from "../../Data/Quotes";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { UserContext } from "../../Contexts/user.context";
import FeelingForm from '../../Components/CryptoTable/FeelingForm.component';
import { Get_Volatility, CalculateStressmetric } from "../../Helpers/API_Calls";

const getLastVolatilityValue = (data) => {
  if (!data) return null;
  const keys = Object.keys(data);
  const lastValue = data[keys[keys.length - 1]];
  if (typeof lastValue !== 'number') return null; // Ensure it's a number
  return lastValue.toFixed(3); // Round off to 2 decimal places
};

const CryptoRoute = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
      setIsFormOpen(true);
    };
    const closeForm = () => {
      setIsFormOpen(false);
    };
  const det = details["data"];
  const { db_user, user } = useContext(UserContext);
  const [stressMetric, setStressMetric] = useState(null);
  const [volatilityData, setVolatilityData] = useState(null);
  const [quote, setQuote] = useState(Quotes[Math.floor(Math.random() * Quotes.length - 1)]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuote(Quotes[Math.floor(Math.random() * Quotes.length - 2)]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    CalculateStressmetric(db_user.uid).then((res) => {
      setStressMetric(res.stress_metric);
    });
    Get_Volatility().then((res) => {
      setVolatilityData(res);
    });
  }, [db_user.uid]);

  return (
    <>
      <div className="cryptos-page flex w-full">
        <div className="flex flex-col gap-5 mt-12 w-full mx-10">
          <AnimatePresence>
            <div className="flex flex-row gap-3">
              <motion.div className="hidden flex-row gap-3 card p-5 lg:flex w-3/5">
                <motion.h2 className="text-2xl font-semibold" layout="position">Did you know?</motion.h2>
                <motion.span
                  key={quote}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 100 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-sm text-white-500"
                >
                  {quote}
                </motion.span>
              </motion.div>
              <div className="inline w-2/5">
                <motion.div className="hidden gap-3 card p-5 lg:flex">
                <h3>
                Today's Market Volatility - {volatilityData ? getLastVolatilityValue(volatilityData) || 'Calculating...' : 'Calculating...'}
                <br />
                According to your today's trades: Your Stress Metric - {stressMetric || 'Calculating...'}
              </h3>
              <div>
    {['Extremely Stressed', 'Stressed'].includes(stressMetric) && (
        <a href="/Educational_Content" className="inline-block bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300">Learn more how you can overcome it</a>
    )}
</div>

                </motion.div>
                <motion.div className="hidden gap-3 card p-5 lg:flex">
                <h3>
  Do you think we are wrong about it?
  <button className="bold" style={{ marginLeft: '10px', textDecoration: 'underline' }} onClick={openForm}>
    {' '}
    TELL US
  </button>
</h3>

      </motion.div>
      <FeelingForm isOpen={isFormOpen} onClose={closeForm} />
              </div>
            </div>
          </AnimatePresence>
          <div className="table-section flex flex-col gap-5">
            <h2 className="text-2xl font-semibold px-2">Crypto Coins</h2>
            <div className="flex flex-col w-full">
              <CryptoTable coinData={det} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoRoute;
