import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import CoinPage from "./routes/CoinPage";
import Account from "./routes/Account";
import axios from "axios";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  const [coins, setCoins] = useState([]);

  // Store API link as string into a variable
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en";

  // It will fire off every time there is a change on the url
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data);
    });
  }, [url]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          {/* The following Route is for the Dynamic Data */}
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
