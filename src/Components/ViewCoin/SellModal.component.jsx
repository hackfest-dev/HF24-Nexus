import { useContext, useEffect, useState } from "react";
import { FetchCryptoHoldings, FetchIndividualCryptoHolding, SellCryptoAPI } from "../../Helpers/API_Calls";
import CurrencyText from "../CurrencyText/CurrencyText.component";
import { UserContext } from "../../Contexts/user.context";
import CryptoHoldings from "../Dashboard/Holdings.component";
import { CalculateStressmetric } from "../../Helpers/API_Calls";

const SellModal = ({ coin, setSellModal }) => {
    const { db_user, user, setRefresh } = useContext(UserContext);

    const [cryptoAmount, setCryptoAmount] = useState("");
    const [fiatAmount, setFiatAmount] = useState("");
    const [selling, setSelling] = useState(false);
    const [holdings, setHoldings] = useState();
    const [stressMetric, setStressMetric] = useState(null);

    useEffect(() => {
        if (user) {
            FetchIndividualCryptoHolding(user.uid, coin.uuid).then((res) => {
                setHoldings(res.amount);
            });
        }
    }, [selling, user]);

    useEffect(() => {
        CalculateStressmetric(db_user.uid).then((res) => {
            setStressMetric(res.stress_metric);
        });
    }, [db_user.uid]);

    const SellCryptoFn = () => {
        if (!user) return;
        setSelling(true);
        SellCryptoAPI(user.uid, coin.uuid, parseFloat(cryptoAmount))
            .then((res) => {
                if (res.status == "Success") {
                    setSellModal(false);
                }
            })
            .finally(() => {
                setSelling(false);
                setRefresh((e) => !e);
            });
    };

    const renderStressSuggestion = () => {
        if (stressMetric === "Extremely Stressed") {
            return (
                <div className="stress-suggestion">
                    <p>**NOT AN ADVICE** < br />
                        But according to our algorithm, your trading pattern is indicating high stress levels.
                        <br />It might be beneficial for you to take a break from trading for a while.
                    </p>
                    <p>As you are appeared to be extremely stressed today, we recommend you to not take trades for today,<br /> as it might affect your mental health which can result in significant losses.</p>
                </div>
            );
        } else if (stressMetric === "Stressed") {
            return (
                <div className="stress-suggestion">
                    <p>**NOT AN ADVICE** < br/>But your trading activity indicates that you may be experiencing some stress.<a href="https://www.investopedia.com/deal-with-crypto-fomo-6455103"> Learn more </a></p>
                    <p>Consider taking a short break of 6-12 hours to reset and come back refreshed.</p>
                </div>
            );
        }
        return null;
    };

    if (!user) {
        return (
            <div className="modal-blur">
                <div className="buy-modal login-container flex flex-col gap-4 p-6 card rounded-lg font-semibold">
                    <span className="text-red-500 self-end" onClick={() => { setSellModal(false) }}>Close</span>
                    Login to trade cryptocurrencies.
                </div>
            </div>
        );
    }

    return (
        <div className="modal-blur">
            <div className="buy-modal login-container flex flex-col gap-4 card p-6 rounded-lg font-semibold">
                <span
                    className="material-symbols-outlined cursor-pointer self-end bg-red-800 rounded-lg p-1 text-lg text-white"
                    onClick={() => { setSellModal(false) }}
                >
                    close
                </span>
                {renderStressSuggestion()}
                <span>
                    Place order to sell {coin.name} <span className="text-xs text-gray-500">{coin.symbol}</span>
                </span>

                <div className="flex w-full justify-between">
                    <span>Current Price:</span>
                    <span>
                        <CurrencyText amoun={coin.price} />
                    </span>
                </div>
                <div className={"flex w-full justify-between" + (holdings >= cryptoAmount ? " text-green-500" : " text-red-500")}>
                    <span>Available Tokens:</span>
                    <span>
                        <CurrencyText amoun={holdings} />
                    </span>
                </div>

                <span className="text-xs flex justify-between">
                    <span>Amount in {coin.symbol}</span>
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                            setCryptoAmount(holdings);
                            setFiatAmount(coin.price * holdings);
                        }}
                    >
                        Sell all?
                    </span>
                </span>
                <input
                    type="text"
                    placeholder={`Enter amount in ${coin.symbol}`}
                    value={cryptoAmount}
                    onChange={(e) => {
                        setCryptoAmount(e.target.value);
                        setFiatAmount(coin.price * e.target.value);
                    }}
                />

                <span className="text-xs">Amount in fiat</span>
                <input
                    type="text"
                    placeholder={`Enter amount in fiat`}
                    value={fiatAmount}
                    onChange={(e) => {
                        setFiatAmount(e.target.value);
                        setCryptoAmount(e.target.value / coin.price);
                    }}
                />

                <div className="flex flex-col gap-1">
                    <span>Estimated Cost</span>
                    <hr />
                    <div className="flex w-full justify-between font-medium">
                        <span>{coin.symbol}</span>
                        <span>
                            <CurrencyText amoun={parseFloat(coin.price) * parseFloat(cryptoAmount)} />
                        </span>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span>Wallet Balance</span>
                        <span>
                            <CurrencyText amoun={db_user.Current_Balance} />
                        </span>
                    </div>
                </div>

                <button
                    className="login"
                    onClick={SellCryptoFn}
                    disabled={holdings < cryptoAmount}
                >
                    {selling ? "Completing transaction" : `Sell ${coin.symbol}`}
                </button>
            </div>
        </div>
    );
};

export default SellModal;