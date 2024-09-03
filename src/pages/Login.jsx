import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/login`,
        {
          email,
          password,
        }
      );

      //si ok voici le console.log // objet contenant mes données + token
      // console.log(response.data.token);
      Cookies.set("VintedLoggedCookie", response.data.token, { expires: 7 });
      location.reload(navigate("/offer/publish"));
    } catch (error) {
      console.error(error.message);
      setErrorMessage(true);
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-container-inside">
        <h1>Se connecter</h1>
        <form onSubmit={postData}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(false);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(false);
            }}
          />
          {errorMessage && (
            <p className="erreur">Mot de passe ou email incorrect</p>
          )}
          <button type="submit" id="submit">
            Se connecter
          </button>
          <Link to="/user/signup">
            <span>Pas encore de compte ? Inscris-toi</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
