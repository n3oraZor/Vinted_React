import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logovinted from "./assets/logo_vinted.svg";
import Home from "../src/pages/Home";
import Offer from "../src/pages/Offer";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Publish from "../src/pages/Publish";
import Payment from "../src/pages/Payment";
import RangeSlider from "./components/RangeSlider";

import "./App.css";

function App() {
  // state for API
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // params for filter
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const [sortOrder, setSortOrder] = useState("price-asc");

  //logout et suppression cookie
  const removeCookies = () => {
    Cookies.remove("VintedLoggedCookie");
    location.reload();
  };

  //Get data from Vinted API using params for filter
  const fetchData = async () => {
    const params = {
      title: search,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      sort: sortOrder,
    };

    //data collected from API
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/v2/offers",
      { params }
    );
    setData(response.data);
    setIsLoading(false);
  };

  // reload when get command is finalized + update on params
  useEffect(() => {
    fetchData();
  }, [search, priceRange, sortOrder]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <Router>
      <nav className="navigation-bar">
        <Link to="/">
          <img src={logovinted} alt="logo-vinted" id="logo-vinted" />
        </Link>
        <form>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="&#x1F50D; | Recherchez vos articles"
            onChange={handleSearch}
          />

          <RangeSlider min={0} max={100000} onRangeChange={setPriceRange} />

          <div className="sortby-container">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              onChange={(e) => {
                e.target.checked === true
                  ? setSortOrder("price-desc")
                  : setSortOrder("price-asc");
              }}
            />
            <label htmlFor="checkbox">Trier</label>
          </div>
        </form>
        {/* On verifie la présence du cookie pour modifier la navbar */}
        {Cookies.get("VintedLoggedCookie") ? (
          <div>
            <button id="deconnect" onClick={removeCookies}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="button">
            <Link to="/user/signup">
              <button id="register">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button id="connect">Se connecter</button>{" "}
            </Link>
          </div>
        )}
        <Link to="/offer/publish">
          <button id="sell">Vends tes articles</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer/publish" element={<Publish />} />
        <Route path="/offer/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
