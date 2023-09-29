import { Link } from "react-router-dom";
import banniereAccueil from "../assets/images/bannieres/banniereAccueil.png";
import choixguitare from "../assets/images/icones/guitarchoice.png";
import custom from "../assets/images/icones/custom.png";
import connect from "../assets/images/icones/connection.png";

function Home() {
  return (
    <div>
      <div className="home">
        <div className="accueil-banniere">
          <img src={banniereAccueil} alt="bannière" id="img-banniere_accueil" />
        </div>
        <h1> Créer ta Suge</h1>
        <div className="explications">
          <div className="exemple">
            <h2>1. Choisi ton model</h2>
            <img src={choixguitare} alt="choisi ta guitare" />
          </div>
          <div className="exemple">
            <h2>2. Customise</h2>
            <img src={custom} alt="customise ta guitare" />
          </div>
          <div className="exemple">
            <h2>3. inscris toi</h2>
            <img src={connect} alt="connection" />
            {/* <p>afin d'obtenir un devis</p> */}
          </div>
        </div>
        <div className="btn">
          <Link to="/guitares">
            <button type="button" className="the-button">
              LET'S ROCK
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
