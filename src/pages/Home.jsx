import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <>
      <div className="heroe-container">
        <div className="heroe-inside">
          <p> Prêts à faire du tri dans vos placards ?</p>
          <button id="start-selling">Commencez à vendre</button>
        </div>
      </div>
      <div className="feed-actu-container">
        <div className="feed-actu">
          {data.offers.map((elem, index) => {
            return (
              <div className="feed-grid" key={index}>
                <div className="feed-grid-seller">
                  <img
                    id="account_avatar"
                    src={data.offers[index].owner.account.avatar?.url}
                    alt=""
                  />
                  <p>{data.offers[index].owner.account.username}</p>
                </div>

                <Link to={`/offer/${data.offers[index]._id}`}>
                  {/* ici on utilise ={``} et pas ="" pour utiliser une variable dans l'URL */}
                  <img
                    id="product_image"
                    src={
                      data.offers[index].product_image?.url ||
                      data.offers[1].product_image.url
                    }
                    alt=""
                  />
                </Link>
                <div className="feed-grid-details">
                  <p>{data.offers[index].product_details[0].MARQUE}</p>
                  <p>{data.offers[index].product_details[1].ÉTAT}</p>
                  <p>{data.offers[index].product_details[1].TAILLE}</p>
                  <p>{data.offers[index].product_price.toFixed(2)} €</p>
                  <p>
                    {(data.offers[index].product_price * 1.2514).toFixed(2)} €
                    incl. ⬡
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
