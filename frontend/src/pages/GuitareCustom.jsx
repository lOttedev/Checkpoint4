import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useCurrentUserContext } from "../context/useCurrentUserContext";
import banner from "../assets/images/bannieres/TeteGuitare.webp";
import teteAligne from "../assets/images/icones/tete-aligne.png";
import teteFerme from "../assets/images/icones/tete-ferme.png";
import teteOuverte from "../assets/images/icones/tete-ouverte.png";
import mancheColle from "../assets/images/icones/manche collé.png";
import mancheTraversant from "../assets/images/icones/manche traversant.png";
import sansRepere from "../assets/images/icones/sans repère.png";
import croixBasque from "../assets/images/icones/repère croix basque.png";
import reperePoints from "../assets/images/icones/repère point.png";
import repereLigne from "../assets/images/icones/repère stick.png";
import microFiltertone from "../assets/images/icones/micro filtertone.png";
import microHumbucker from "../assets/images/icones/micros humbucker.png";
import microTele from "../assets/images/icones/micro tele.png";
import boutons2 from "../assets/images/icones/élec 2 bouton.png";
import bouton4 from "../assets/images/icones/élec 4 bouton.png";
import boutonTele from "../assets/images/icones/élec plaque tele.png";

function GuitareCustom({ onCustomSelect }) {
  const { user } = useCurrentUserContext();
  const [guitare, setGuitare] = useState([]);
  const [selectedElem, setSelectedElem] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const openConnectionModal = () => {
    document.getElementById("connectionModal").showModal();
  };

  const [customOpacities, setCustomOpacities] = useState({
    aligne: 0.5,
    ferme: 0.5,
    ouverte: 0.5,
    colle: 0.5,
    traversant: 0.5,
    sans: 0.5,
    croix: 0.5,
    point: 0.5,
    trait: 0.5,
    filtertone: 0.5,
    humbucker: 0.5,
    tele: 0.5,
    filtertonec: 0.5,
    humbuckerc: 0.5,
    telec: 0.5,
    btn2: 0.5,
    btn4: 0.5,
    btntele: 0.5,
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/guitares/${id}`)
      .then((res) => {
        setGuitare(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  }, []);

  const handleClick = (type) => {
    setCustomOpacities((prevOpacities) => ({
      ...prevOpacities,
      [type]: prevOpacities[type] === 0.5 ? 1 : 0.5,
    }));

    if (customOpacities[type] === 1) {
      setSelectedImage(type);
    }
  };

  function handleButtonClick() {
    if (selectedImage && selectedElem) {
      onCustomSelect(selectedImage, selectedElem);
    } else {
      return "vous n'avez rien selectionné";
    }
    return onCustomSelect(selectedImage, selectedElem);
  }

  return (
    <div className="guitare">
      <div>
        <img src={banner} alt="bannière" className="guitareid-banner" />
      </div>
      <div>
        <h1>CUSTOMISE TA GUITARE</h1>
        <div className="prereglage">
          <p>PREREGLAGE</p>
          <select
            value={selectedElem}
            onChange={(e) => setSelectedElem(e.target.value)}
            className="select-reglage"
          >
            <option value="">-- Sélectionnez un préréglage --</option>
            <option value="funk">Funk</option>
            <option value="blues">Blues</option>
            <option value="metal">Métal</option>
          </select>
        </div>
        <div className="custom">
          <div>
            <div className="guitare-box">
              <div>
                <div>
                  <p>TETE</p>
                  <button
                    type="submit"
                    value="aligne"
                    className="btn_tete"
                    style={{ opacity: customOpacities.aligne }}
                    onClick={() => handleClick("aligne")}
                  >
                    {" "}
                    <img src={teteAligne} alt="icone" />{" "}
                    <p>{`${guitare.tete}`}</p>
                  </button>
                  <button
                    type="submit"
                    value="ferme"
                    className="btn_tete"
                    style={{ opacity: customOpacities.ferme }}
                    onClick={() => handleClick("ferme")}
                  >
                    {" "}
                    <img src={teteFerme} alt="icone" /> <p>fermé</p>
                  </button>
                  <button
                    type="submit"
                    value="ouverte"
                    className="btn_tete"
                    style={{ opacity: customOpacities.ouverte }}
                    onClick={() => handleClick("ouverte")}
                  >
                    {" "}
                    <img src={teteOuverte} alt="icone" /> <p>ouverte</p>
                  </button>
                </div>
                <div>
                  <p>MANCHE</p>
                  <button
                    type="submit"
                    value="collé"
                    className="btn_manche"
                    style={{ opacity: customOpacities.colle }}
                    onClick={() => handleClick("colle")}
                  >
                    {" "}
                    <img src={mancheColle} alt="icone" /> <p>manche collé</p>
                  </button>
                  <button
                    type="submit"
                    value="traversant"
                    className="btn_manche"
                    style={{ opacity: customOpacities.traversant }}
                    onClick={() => handleClick("traversant")}
                  >
                    {" "}
                    <img src={mancheTraversant} alt="icone" />{" "}
                    <p>manche traversant</p>
                  </button>
                </div>
                <div>
                  <p>BOUTONS ET SELECTEUR</p>
                  <button
                    type="submit"
                    value="btn2"
                    className="btn_btn"
                    style={{ opacity: customOpacities.btn2 }}
                    onClick={() => handleClick("btn2")}
                  >
                    {" "}
                    <img src={boutons2} alt="icone" /> <p>2 Boutons</p>
                  </button>
                  <button
                    type="submit"
                    value="btn4"
                    className="btn_btn"
                    style={{ opacity: customOpacities.btn4 }}
                    onClick={() => handleClick("btn4")}
                  >
                    {" "}
                    <img src={bouton4} alt="icone" /> <p>4 Boutons</p>
                  </button>
                  <button
                    type="submit"
                    value="btntele"
                    className="btn_btn"
                    style={{ opacity: customOpacities.btntele }}
                    onClick={() => handleClick("btntele")}
                  >
                    {" "}
                    <img src={boutonTele} alt="icone" />{" "}
                    <p>Plaque Télécaster</p>
                  </button>
                </div>
              </div>

              <div className="guitareid-box">
                <div className="guitaresid-container">
                  <div>
                    <img
                      src={`${guitare.image}`}
                      alt={`${guitare.name}`}
                      className="guitare-id"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>RERERES</p>
                  <button
                    type="submit"
                    value="sans"
                    className="btn_repere"
                    style={{ opacity: customOpacities.sans }}
                    onClick={() => handleClick("sans")}
                  >
                    {" "}
                    <img src={sansRepere} alt="icone" /> <p>sans repère</p>
                  </button>
                  <button
                    type="submit"
                    value="croix"
                    className="btn_tete"
                    style={{ opacity: customOpacities.croix }}
                    onClick={() => handleClick("croix")}
                  >
                    {" "}
                    <img src={croixBasque} alt="icone" /> <p>croix Basque</p>
                  </button>
                  <button
                    type="submit"
                    value="point"
                    className="btn_tete"
                    style={{ opacity: customOpacities.point }}
                    onClick={() => handleClick("point")}
                  >
                    {" "}
                    <img src={reperePoints} alt="icone" /> <p>Repère Points</p>
                  </button>
                  <button
                    type="submit"
                    value="trait"
                    className="btn_tete"
                    style={{ opacity: customOpacities.trait }}
                    onClick={() => handleClick("trait")}
                  >
                    {" "}
                    <img src={repereLigne} alt="icone" /> <p>Repère Traits </p>
                  </button>
                </div>
                <div>
                  <p>MICRO MANCHE</p>
                  <button
                    type="submit"
                    value="filtertone"
                    className="btn_microm"
                    style={{ opacity: customOpacities.filtertone }}
                    onClick={() => handleClick("filtertone")}
                  >
                    {" "}
                    <img src={microFiltertone} alt="icone" /> <p>Filtertone</p>
                  </button>
                  <button
                    type="submit"
                    value="humbucker"
                    className="btn_microm"
                    style={{ opacity: customOpacities.humbucker }}
                    onClick={() => handleClick("humbucker")}
                  >
                    {" "}
                    <img src={microHumbucker} alt="icone" /> <p>Humbucker</p>
                  </button>
                  <button
                    type="submit"
                    value="tele"
                    className="btn_microm"
                    style={{ opacity: customOpacities.tele }}
                    onClick={() => handleClick("tele")}
                  >
                    {" "}
                    <img src={microTele} alt="icone" /> <p>Telecaster</p>
                  </button>
                </div>
                <div>
                  <p>MICRO CHEVALET</p>
                  <button
                    type="submit"
                    value="filtertonec"
                    className="btn_microm"
                    style={{ opacity: customOpacities.filtertonec }}
                    onClick={() => handleClick("filtertonec")}
                  >
                    {" "}
                    <img src={microFiltertone} alt="icone" /> <p>Filtertone</p>
                  </button>
                  <button
                    type="submit"
                    value="humbuckerc"
                    className="btn_microm"
                    style={{ opacity: customOpacities.humbuckerc }}
                    onClick={() => handleClick("humbuckerc")}
                  >
                    {" "}
                    <img src={microHumbucker} alt="icone" /> <p>Humbucker</p>
                  </button>
                  <button
                    type="submit"
                    value="telec"
                    className="btn_microm"
                    style={{ opacity: customOpacities.telec }}
                    onClick={() => handleClick("telec")}
                  >
                    {" "}
                    <img src={microTele} alt="icone" /> <p>Telecaster</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <div className="btn">
          <Link to={`/profil/${id}`}>
            <button
              type="button"
              className="button-enregistrer"
              onClick={handleButtonClick}
            >
              ENREGISTRER
            </button>
          </Link>
        </div>
      ) : (
        <div className="btn">
          <button
            type="button"
            onClick={openConnectionModal}
            className="button-connection"
          >
            CONNECTION
          </button>
        </div>
      )}
    </div>
  );
}
GuitareCustom.propTypes = {
  onCustomSelect: PropTypes.func,
};

GuitareCustom.defaultProps = {
  onCustomSelect: () => {},
};

export default GuitareCustom;
