import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment() {
  const location = useLocation();
  const { title, price } = location.state;

  // les infos de la transaction
  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };

  // Element est un composant de Stripe qui contient tous les éléments de paiement
  //On donne à element la preuve qu'on est connecté et les options de paiement

  return (
    <div className="container">
      <div className="container-title">
        <h3>Article : {title}</h3>
        <h2>Montant à régler {price}€</h2>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </div>
  );
}

export default Payment;
