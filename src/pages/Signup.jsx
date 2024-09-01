import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";



const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
        {
          email,
          username,
          password,
          newsletter,
        }
      );

      //si ok voici le console.log // objet contenant mes données + token
      console.log(response.data);

      //si retour ok on doit avoir le token dans reponse.data.token
      response.data.token &&
        Cookies.set("token", response.data.token, { expires: 5 });
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setErrorMessage(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-inside">
        <h1>S'inscrire</h1>
        <form onSubmit={postData}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="newsletter-container">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              onClick={(e) => setNewsletter(e.target.checked)}
            />
            <h2>S'inscrire à la newsletter</h2>
          </div>
          <p>
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de vinte. Je confirme
            avoir au moins 18 ans.
          </p>
          {errorMessage && (
            <div className="compte-existant">Le compte est déja existant</div>
          )}
          <button type="submit" id="submit">
            S'inscrire
          </button>

          <Link to="/login">
            <span>Tu as déjà un compte ? Connecte-toi !</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
