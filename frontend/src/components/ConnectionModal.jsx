import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCurrentUserContext } from "../context/useCurrentUserContext";

function ModalConnection() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [fields, setFields] = useState({
    mailConnection: "",
    passwordConnection: "",
  });
  const { setUser } = useCurrentUserContext();

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fields.mailConnection.length && fields.passwordConnection.length) {
      axios
        .post("/auth/sign-in", fields)
        .then((res) => {
          setUser(res.data.id);
          localStorage.setItem("user", JSON.stringify(res.data.id));
          document.getElementById("connectionModal").close();
        })
        .catch(() => {
          toast.error("Identifiants incorrects", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
        });
    } else {
      toast.error("Renseigner correctement vos identifiants", {
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
  };

  const openCreateAccountModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").close();
  };

  return (
    <dialog id="connectionModal">
      <form method="dialog" className="form-dialog">
        <button type="button" onClick={closeModal} className="close-modal">
          Fermer
        </button>
      </form>
      <form onSubmit={handleSubmit} method="dialog" className="form-connection">
        <h4>CONNECTEZ VOUS</h4>
        <div>
          <p>EMAIL</p>
          <input
            id="mailConnection"
            value={fields.mailConnection}
            name="mail"
            onChange={handleChange}
            type="mail"
          />
          <p>MOT DE PASSE</p>
          <input
            id="passwordConnection"
            value={fields.passwordConnection}
            name="password"
            onChange={handleChange}
            type={passwordIsVisible ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setPasswordIsVisible((prevState) => !prevState)}
            className="thebutton"
          >
            {passwordIsVisible
              ? "Cacher le mot de passe"
              : "Afficher le mot de passe"}
          </button>
        </div>
        <div>
          <button type="submit" className="the-button">
            Se connecter
          </button>
        </div>
        <div className="">
          <button
            type="button"
            onClick={openCreateAccountModal}
            className="the-button-compte"
          >
            Créer un compte
          </button>
        </div>
      </form>
      <ToastContainer />
    </dialog>
  );
}

export default ModalConnection;
