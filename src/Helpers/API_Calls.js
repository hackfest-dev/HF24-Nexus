import axios from "axios"
// import { url } from "inspector";
// import { initializeApp } from "firebase/app";
// import { getFirestore, setDoc, getDoc, updateDoc , doc } from "firebase/firestore";
// import { firebaseConfig }  from '../Utils/firebase.js';



// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);


export async function FetchCoin(uid, timePeriod) {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uid}`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchCoinPrice(uid, timePeriod) {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uid}/history`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchDBData(uid, accessToken) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function CreateUserinDB(uid, First_Name, Last_Name, Email, Phone) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/create_user`,
    params: {
      uid,
      First_Name,
      Last_Name,
      Email,
      Phone
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addMoneyDB(uid, quantity) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/add_balance`,
    params: {
      uid,
      quantity
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function WithdrawMoney(uid, quantity) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/withdraw_money`,
    params: {
      uid,
      quantity
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchBalance(uid) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/users/${uid}/fetch_balance`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function BuyCryptoAPI(uid, token_id, quantity) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/users/${uid}/buy_crypto`,
    params: {
      token_id,
      quantity
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function SellCryptoAPI(uid, token_id, quantity) {
  const options = {
    method: 'POST',
    url: `https://api-cryptohack.onrender.com/users/${uid}/sell_crypto`,
    params: {
      token_id,
      quantity
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function FetchCryptoHoldings(uid) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/crypto_holdings`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchCryptoTransactions(uid) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/crypto_transactions`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchCryptoTransactionsInfo(uid){
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/crypto_transactions_info`
  };
  try {
    const response = await axios.request(options);

    return response.data;
  } catch(error) {
    console.error(error)
  }
}

export async function CalculateStressmetric(uid){
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/calculate_stress_metric`
  };
  try {
    const response = await axios.request(options);
    
    return response.data;
  } catch(e){
    console.error(e)
  }
  }


export async function FetchFiatTransactions(uid) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/fiat_transactions`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchInitialBalance(uid) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/initial_portfolio_value`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchIndividualCryptoHolding(uid, token_id) {
  const options = {
    method: 'GET',
    url: `https://api-cryptohack.onrender.com/users/${uid}/get_crypto_holding`,
    params:{
      token_id
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchListOfCoins(symbol_list) {
  const listofSymbols = {}

  symbol_list.map((sym, i) => {
    listofSymbols[`symbols[${i}]`] = sym;
  })

  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coins`,
    params: {
      'tiers[0]': '1',
      ...listofSymbols
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}