import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUserContext } from "../context/useCurrentUserContext";
import ModalConnection from "./ConnectionModal";
import ModalCreateAccount from "./ModalCreateAccount";

import logo from "../assets/images/bannieres/logo-Suge.png";

function NavBar() {
  const { user, setUser } = useCurrentUserContext();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [menuBurger, setMenuBurger] = useState(false);

  function toggleMenu() {
    setMenuBurger(!menuBurger);
  }

  useEffect(() => {
    const userId = localStorage.getItem("user");
    setId(userId);
  }, []);

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`).then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        setUser(null);
        navigate("/");
      } else {
        toast("Impossible de se déconnecter");
      }
    });
    navigate("/");
  };

  const openConnectionModal = () => {
    document.getElementById("connectionModal").showModal();
  };

  return (
    <nav>
      <NavLink to="/" className="active">
        <img src={logo} alt="logo" id="logonav" />
      </NavLink>
      <ul className="menu">
        <li>
          <NavLink to="/">ACCUEIL</NavLink>
        </li>
        <li>
          <NavLink to="/Guitares">GUITARES</NavLink>
        </li>
        <li>
          <Link
            to="https://www.sugeguitare.fr/contacter-ou-commander/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to={`/profil/${id}`}>PROFIL</NavLink>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>
                DÉCONNEXION
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              type="button"
              onClick={openConnectionModal}
              className="button-connection"
            >
              CONNECTION
            </button>
          </li>
        )}
      </ul>
      <FontAwesomeIcon
        className="burger"
        icon={menuBurger ? faTimes : faBars}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={toggleMenu}
      />

      {menuBurger && (
        <ul className="menuBurger">
          <li>
            <NavLink to="/Home">ACCUEIL</NavLink>
          </li>
          <li>
            <NavLink to="/Guitares">GUITARES</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">CONTACT</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to={`/profil/${id}`}>PROFIL</NavLink>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  DÉCONNEXION
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/Connection">CONNECTION</NavLink>
            </li>
          )}
        </ul>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <ModalConnection />
      <ModalCreateAccount />
    </nav>
  );
}

export default NavBar;
