import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import banner from "../assets/images/bannieres/TeteGuitare.webp";

function Guitares() {
  const [guitares, setGuitares] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/guitares`)
      .then((res) => {
        setGuitares(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  });

  return (
    <div className="guitares">
      <div>
        <img src={banner} alt="bannière" className="guitare-banner" />
      </div>
      <div>
        <h1>SELECTIONNE TON MODEL</h1>
        <div className="guitares-box">
          {guitares &&
            guitares.map((guitare) => (
              <Link
                to={`/guitares/${guitare.id}`}
                className="link-guitares"
                key={`${guitare.id}`}
              >
                <div className="guitares-container">
                  <button type="button" className="guitar-btn">
                    <div>
                      <img
                        src={`${guitare.image}`}
                        alt={`${guitare.name}`}
                        className="guitare"
                      />
                      <p>{`${guitare.name}`}</p>
                    </div>
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Guitares;
