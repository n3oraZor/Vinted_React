import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./Publish.css";

const Publish = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState("");
  const [cloudinaryPicture, setCloudinaryPicture] = useState(null);
  const [titre, setTitre] = useState(null);
  const [description, setDescription] = useState(null);
  const [marque, setMarque] = useState(null);
  const [taille, setTaille] = useState(null);
  const [couleur, setCouleur] = useState(null);
  const [etat, setEtat] = useState(null);
  const [lieu, setLieu] = useState(null);
  const [prix, setPrix] = useState(null);
  const userToken = Cookies.get("VintedLoggedCookie");

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("name", name);
      formData.append("title", titre);
      formData.append("description", description);
      formData.append("price", prix);
      formData.append("condition", etat);
      formData.append("city", lieu);
      formData.append("brand", marque);
      formData.append("size", taille);
      formData.append("color", couleur);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCloudinaryPicture(response.data.secure_url);
      location.reload(navigate("/"));
    } catch (error) {
      console.log("Message erreur API reacteur", error.response.data.message);
    }
  };

  return !Cookies.get("VintedLoggedCookie") ? (
    <Navigate to="/login" />
  ) : (
    <div className="publish-page">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="picture-container">
            <div className="upload">
              <input
                type="text"
                id="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
              />
              <label htmlFor="file">Ajoute une photo</label>
            </div>
            {picture && (
              <img src={URL.createObjectURL(picture)} alt="preview" />
            )}
          </div>

          <div className="title-container">
            <div className="infos-container">
              <div className="int">
                <div className="int-left">
                  <p>Titre</p>
                </div>
                <div className="int-right">
                  <input
                    type="text"
                    name="title"
                    id="titletext"
                    placeholder="ex: Chemise sézane verte"
                    onChange={(e) => {
                      setTitre(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="int">
                <div className="int-left">
                  <p>Décris ton article</p>
                </div>
                <div className="int-right">
                  <textarea
                    name="description"
                    id="description"
                    placeholder="ex: Porté quelques fois, taille correctement"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="infos-container">
            <div className="int">
              <div className="int-left">
                <p>Marque</p>
              </div>
              <div className="int-right">
                <input
                  type="text"
                  name="marque"
                  id="marque"
                  placeholder="ex: Zara"
                  onChange={(e) => {
                    setMarque(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="int">
              <div className="int-left">
                <p>Taille</p>
              </div>
              <div className="int-right">
                <input
                  type="text"
                  name="taille"
                  id="taille"
                  placeholder="ex: L / 40 / 12"
                  onChange={(e) => {
                    setTaille(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="int">
              <div className="int-left">
                <p>Couleur</p>
              </div>
              <div className="int-right">
                <input
                  type="text"
                  name="couleur"
                  id="couleur"
                  placeholder="ex: Fuschia"
                  onChange={(e) => {
                    setCouleur(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="int">
              <div className="int-left">
                <p>Etat</p>
              </div>
              <div className="int-right">
                <input
                  type="text"
                  name="etat"
                  id="etat"
                  placeholder="ex: neuf avec étiquette"
                  onChange={(e) => {
                    setEtat(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="int">
              <div className="int-left">
                <p>Lieu</p>
              </div>
              <div className="int-right">
                <input
                  type="text"
                  name="lieu"
                  id="lieu"
                  placeholder="ex: Paris"
                  onChange={(e) => {
                    setLieu(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="price-container">
            <div className="int">
              <div className="int-left">
                <p>Prix</p>
              </div>
              <div className="int-right">
                <input
                  type="number"
                  name="prix"
                  id="prix"
                  placeholder="0.00€"
                  onChange={(e) => {
                    setPrix(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sell-container">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
