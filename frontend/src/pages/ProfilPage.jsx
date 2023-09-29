import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import banner from "../assets/images/bannieres/TeteGuitare.webp";
import GuitareCustom from "./GuitareCustom";

function ProfilPage({ selectedImage, selectedElem }) {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  }, []);

  return (
    <div className="profil">
      <div>
        <div className="titre-info">
          <div>
            <img src={banner} alt="bannière" className="profil-banner" />
            <h1>Mon Profil</h1>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="user-info">
          <h4>MES INFORMATIONS</h4>
          <p> {user.firstname}</p>
          <p> {user.lastname}</p>
          <p> {user.mail}</p>
          <p> {user.phone}</p>
          <p> {user.adress}</p>
        </div>
        <div className="guitar-info">
          <h4>MES CREATIONS</h4>
          <p>Élément tête de guitare sélectionné : </p>
          <div>
            {selectedImage.length !== 0 ? (
              selectedImage.map((image) => (
                <div>
                  <GuitareCustom image={image} />
                </div>
              ))
            ) : (
              <div>
                <p>
                  {user.firstname}, vous n'avez pas encore customisé de guitare{" "}
                </p>
              </div>
            )}
          </div>

          <p>Élément préréglé sélectionné : {`${selectedElem.value}`}</p>
        </div>
      </div>
    </div>
  );
}
ProfilPage.propTypes = {
  selectedImage: PropTypes.string,
  selectedElem: PropTypes.string,
};

ProfilPage.defaultProps = {
  selectedImage: [],
  selectedElem: "",
};

export default ProfilPage;
