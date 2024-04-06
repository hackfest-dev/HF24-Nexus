import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/user.context";
import AddMoney from "../../Components/AddMoney/AddMoney.component";
import CurrencyText from "../../Components/CurrencyText/CurrencyText.component";
import { FetchCryptoHoldings, FetchCryptoTransactions, FetchFiatTransactions, FetchInitialBalance, FetchListOfCoins, FetchCryptoTransactionsInfo } from "../../Helpers/API_Calls";
import CryptoHoldings from "../../Components/Dashboard/Holdings.component";
import CryptoTransactionsDashboard from "../../Components/Dashboard/CryptoTransactions.component";
import FiatTransactionsDashboard from "../../Components/Dashboard/FiatTransactions.component";

const Analyze_TradesRoute = () => {
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
    const [plTransactions, setplTransactions] = useState([])


    const [initialPortfolioValue, setInitialPortfolioValue] = useState(0);

    useEffect(() => {
        if (!user) {
            return;
        }

        FetchCryptoHoldings(user.uid).then((res) => {
            setCryptoHoldings(res)
        })

        FetchCryptoTransactionsInfo(user.uid).then((res) => {
            setplTransactions(res)
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
            <div>
                { console.log(plTransactions)}
                {plTransactions && plTransactions.length > 0 ? (
                    <div>
                        <h2>Profit/Loss Transactions</h2>
                        <ul>
                            {plTransactions.map((transaction, index) => (
                                <li key={index}>
                                    {/* Assuming your transaction object has properties like date, amount, type, etc. */}
                                    <p>Date: {transaction.date}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    <p>Type: {transaction.type}</p>
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No profit/loss transactions found.</p>
                )}
            </div>
        </Fragment>
    );
    
}

export default Analyze_TradesRoute