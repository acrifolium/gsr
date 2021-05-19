import { useState, useEffect } from "react";

const useCurrencies = () => {
  const [currencies, setcurrencies] = useState(null);

  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    let pairs = [];

    const getProductsFromCoinBaseApi = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      
      let filtered = pairs.filter((pair) => pair.quote_currency === "USD");
      setcurrencies(filtered);
    };

    getProductsFromCoinBaseApi();
  }, []);

  return currencies;
};

export default useCurrencies;
