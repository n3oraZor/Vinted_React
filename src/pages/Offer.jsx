import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultavatar from "../assets/default-avatar.png";
import "./Offer.css";

const Offer = () => {
  const { id } = useParams(); // {id:"dfgjkdfgdfgdfkg"}
  // on destructure plutot que de créer une nouvelle const
  // const id = params.id

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!data) {
    return <p>Erreur : les données n'ont pas pu être récupérées.</p>;
  }

  return (
    <div className="offer-container">
      <div className="offer-container-inside">
        <div className="offer-container-inside-left">
          {data.product_pictures.map((elem, index) => {
            return (
              <img src={data.product_pictures[index].url} alt="" key={index} />
            );
          })}
        </div>
        <div className="offer-container-inside-right">
          <div className="center-container">
            <h3>{data.product_price.toFixed(2)}€</h3>

            {data.product_details.map((elem, index) => {
              const keys = Object.keys(elem);
              const key = keys[0];

              return (
                <ul className="product-list" key={index}>
                  <p key={index}>{keys}</p>
                  <li>
                    <p>: {elem[key]}</p>
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="center-container-down">
            <h3>{data.product_name}</h3>
            <p>{data.product_description}</p>
            <div className="user-details">
              {data.owner.account.avatar ? (
                <img src={data.owner.account.avatar.secure_url} />
              ) : (
                <img src={defaultavatar} />
              )}
              <p>{data.owner.account.username}</p>
            </div>
            <Link
              to="/offer/payment"
              state={{
                title: data.product_name,
                price: data.product_price.toFixed(2),
              }}
            >
              <button id="buy">Acheter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
