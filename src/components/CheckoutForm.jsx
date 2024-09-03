import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function CheckoutForm({ title, price }) {
  //state de gestion du message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  //state pour la confirmation du paiement
  const [success, setSuccess] = useState(false);
  //state loader durant la transaction
  const [isPaying, setIsPaying] = useState(false);
  //pour interagir avec Stripe
  const stripe = useStripe();
  // pour récupérer et vérifier les éléments
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //on veut disable le bouton au début de la fonction
      setIsPaying(true);
      // s'il y a un pb avec les éléments on arrete tout
      if (elements == null) {
        return;
      }
      // on envoi à stripe les infos pour voir si tout est bon
      // on fait un destructuring de la clé error et on a re renomme en submitError car on va avoir besoin du nom de l'erreur
      const { error: submitError } = await elements.submit();
      // si erreur recue on arrete tout et on donne a errorMessage le message de Stripe
      if (submitError) {
        // Affiche l'erreur en question
        setErrorMessage(submitError.message);
        return;
      }

      //si pas d'erreur on fait une intention de paiement via notre bakend securisé
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price,
        }
      );

      //console.log(response.data.client_secret);
      //on stocke dans une variable ce client secret
      const clientSecret = response.data.client_secret;

      //requete à stripe pour valider le paiement
      const { error, paymentIntent } = await stripe.confirmPayment({
        // les infos de la cb
        elements: elements,
        clientSecret: clientSecret,
        confirmParams: { return_url: "http://localhost:5173/" },
        redirect: "if_required",
      });

      //si y'a un pb
      if (error) {
        setErrorMessage(error.message);
      }

      // si le paymentIntent c'est bien passé
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }

      setIsPaying(false);
    } catch (error) {
      console.log(error);
    }
    setIsPaying(false);
  };

  return success ? (
    <p>Merci pour votre achat</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || isPaying}>Payer</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
