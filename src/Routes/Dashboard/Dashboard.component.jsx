import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/user.context";
import AddMoney from "../../Components/AddMoney/AddMoney.component";
import CurrencyText from "../../Components/CurrencyText/CurrencyText.component";
import { FetchCryptoHoldings, FetchCryptoTransactions, FetchFiatTransactions, FetchInitialBalance, FetchListOfCoins } from "../../Helpers/API_Calls";
import CryptoHoldings from "../../Components/Dashboard/Holdings.component";
import CryptoTransactionsDashboard from "../../Components/Dashboard/CryptoTransactions.component";
import FiatTransactionsDashboard from "../../Components/Dashboard/FiatTransactions.component";

const DashboardRoute = () => {
    const [showAllHoldings, setShowAllHoldings] = useState(false);

    const handleViewAll = () => {
        setShowAllHoldings(true);
    };

    // Assuming you have a function to toggle back to limited holdings
    const handleViewLimited = () => {
        setShowAllHoldings(false);
    };

    const [showAllTransactions, setShowAllTransactions] = useState(false);

    const handleViewAll1 = () => {
        setShowAllTransactions(true);
    };

    // Assuming you have a function to toggle back to limited transactions
    const handleViewLimited1 = () => {
        setShowAllTransactions(false);
    };

    const [showAllFiatTransactions, setShowAllFiatTransactions] = useState(false);

    const handleShowAllFiatTransactions = () => {
        setShowAllFiatTransactions(true);
    };

    // Assuming you have a function to toggle back to limited transactions
    const handleShowLimitedFiatTransactions = () => {
        setShowAllFiatTransactions(false);
    };

    const { db_user, user } = useContext(UserContext);

    const [moneyModal, setModal] = useState(false);

    const [cryptoHoldings, setCryptoHoldings] = useState([]);

    const [listOfCoins, setListOfCoins] = useState([]);

    const [portValue, setValue] = useState(0);

    const [fiatTransactions, setFiatTransactions] = useState([]);
    const [cryptoTransactions, setCryptoTransactions] = useState([]);

    const [initialPortfolioValue, setInitialPortfolioValue] = useState(0);

    useEffect(() => {
        if (!user) {
            return;
        }

        FetchCryptoHoldings(user.uid).then((res) => {
            setCryptoHoldings(res)
        })

        FetchFiatTransactions(user.uid).then((res) => {
            setFiatTransactions(res)
        })

        FetchCryptoTransactions(user.uid).then((res) => {
            setCryptoTransactions(res)
        })

        FetchInitialBalance(user.uid).then((res) => {
            setInitialPortfolioValue(res?.original_value)
        })
    }, [])

    useEffect(() => {
        if (cryptoHoldings.length > 0) {
            const symbol_list = cryptoHoldings.map((holding) => {
                return holding.token_symbol
            })

            FetchListOfCoins(symbol_list).then((res) => {
                const coins = {}

                res.data.coins.map((coin) => {
                    coins[coin.symbol] = coin
                })

                setListOfCoins(coins);
            })

        }
    }, [cryptoHoldings])

    useEffect(() => {
        if (!listOfCoins.length === 0)
            return;

        let port = 0;

        cryptoHoldings.map((holding) => {
            port += holding.quantity * listOfCoins[holding.token_symbol]?.price
        })

        setValue(port);
    }, [cryptoHoldings, listOfCoins])

    return (
        <Fragment>
            {
                moneyModal &&
                <AddMoney setModal={setModal} />
            }

            <div className="dashboard-route flex flex-col font-medium gap-4 cryptos-page text-base w-full px-5">
                <div className="flex gap-2 mt-10">
                    <div className="flex p-6 gap-3 items-center card flex-1 justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-white">account_balance</span>
                            <div className="flex flex-col">
                                <span className="text-sm">Current Balance:</span>
                                <span className="blue font-semibold"><CurrencyText amoun={db_user?.Current_Balance} /></span>
                            </div>
                        </div>

                        <span
                            className="material-symbols-outlined bg-green-600 rounded-lg p-1 text-white cursor-pointer"
                            onClick={() => { setModal(true) }}
                        >add</span>
                    </div>
                    <div className="flex p-6 gap-3 items-center card flex-1">
                        <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-white">currency_bitcoin</span>
                        <div className="flex flex-col">
                            <span className="text-sm">Portfolio Value:</span>
                            <span className="blue font-semibold flex gap-1 items-center">
                                <CurrencyText amoun={portValue} />
                                <span className={"text-xs" + (portValue - initialPortfolioValue >= 0 ? " text-green-500" : " text-red-500")}>{portValue - initialPortfolioValue >= 0 ? "+" : ""}{(portValue - initialPortfolioValue).toFixed(2)}</span>
                            </span>
                        </div>

                    </div>
                    <Link to="/Analyze_Trades">
    <div className="mt-1 bg-blue-800 text-white px-4 py-4 rounded-md cursor-pointer">
    Analyze Trading History
</div>

</Link>

                    
                </div>

                <div className="flex w-full gap-4 items-start flex-wrap">
                    <div className="flex flex-col gap-4" style={{ flex: "2" }}>

                    <div className="flex flex-col gap-4 p-5 card">
            <div className="flex w-full justify-between items-center">
                <span className="text-lg">Current Holdings</span>
                {showAllHoldings ? (
                    <button className="text-sm cursor-pointer" onClick={() => handleViewLimited()}>
                        View less
                    </button>
                ) : (
                    <button className="text-sm cursor-pointer" onClick={() => handleViewAll()}>
                        View all
                    </button>
                )}
            </div>
            <div className="flex">
                {cryptoHoldings && cryptoHoldings.length > 0 && (
                    <CryptoHoldings holdings={showAllHoldings ? cryptoHoldings : cryptoHoldings.slice(0, 6)} listOfCoins={listOfCoins} />
                )}
            </div>
        </div>

        <div className="flex gap-5">
            <div className="flex flex-col gap-4 p-4 px-6 card w-full">
                <div className="flex w-full justify-between items-center">
                    <span className="text-lg">Fiat Transaction History</span>
                    {showAllFiatTransactions ? (
                        <button className="text-sm cursor-pointer" onClick={() => handleShowLimitedFiatTransactions()}>
                            View less
                        </button>
                    ) : (
                        <button className="text-sm cursor-pointer" onClick={() => handleShowAllFiatTransactions()}>
                            View all
                        </button>
                    )}
                </div>
                <div className="flex">
                    {fiatTransactions && fiatTransactions.length > 0 && (
                        <FiatTransactionsDashboard transactions={showAllFiatTransactions ? fiatTransactions : fiatTransactions.slice(0, 2)} />
                    )}
                </div>
            </div>
        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-5 px-6 card flex-1">
            <div className="flex w-full justify-between items-center">
                <span className="text-lg">Crypto Transaction History</span>
                {showAllTransactions ? (
                    <button className="text-sm cursor-pointer" onClick={() => handleViewLimited1()}>
                        View less
                    </button>
                ) : (
                    <button className="text-sm cursor-pointer" onClick={() => handleViewAll1()}>
                        View all
                    </button>
                )}
            </div>
            <div className="flex">
                {cryptoTransactions && cryptoTransactions.length > 0 && (
                    <CryptoTransactionsDashboard transactions={showAllTransactions ? cryptoTransactions : cryptoTransactions.slice(0, 6)} />
                )}
            </div>
        </div>
        <div>
                <h1></h1>
            </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashboardRoute;