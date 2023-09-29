/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

function ModalCreateAccount() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const closeModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").close();
  };

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, data)
      .then(() => {
        toast.success(
          "Votre inscription a réussi. Vous pouvez vous connecter.",
          {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          }
        );
        document.getElementById("creationModal").close();
        document.getElementById("connectionModal").showModal();
      })
      .catch(() => {
        toast.error("Renseigner correctement vos identifiants", {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      });
  };
  return (
    <div>
      <dialog id="creationModal">
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal} className="close-modal">
            Fermer
          </button>
        </form>
        <div method="dialog">
          <h4>Créer un compte</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="form-account">
            <div>
              <div className="name-conatiner">
                <div className="label-container-modal">
                  <label htmlFor="firstname">PRENOM</label>
                  <input
                    type="text"
                    name="firstname"
                    {...register("firstname", {
                      required: true,
                    })}
                    aria-invalid={errors.firstname ? "true" : "false"}
                  />
                  {errors.firstname && (
                    <span>Le champs prénom est obligatoire</span>
                  )}
                </div>
                <div className="label-container-modal">
                  <label htmlFor="lastname">NOM</label>
                  <input
                    type="text"
                    name="lastname"
                    {...register("lastname", {
                      required: true,
                    })}
                    aria-invalid={errors.lastname ? "true" : "false"}
                  />
                  {errors.lastname && <span>Le champ nom est obligatoire</span>}
                </div>
              </div>
              <div className="label-container-modal">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  name="creationMail"
                  {...register("creationMail", {
                    required: true,
                  })}
                  aria-invalid={errors.creationMail ? "true" : "false"}
                />
                {errors.creationMail && (
                  <span>Le champ email est invalide</span>
                )}
              </div>
              <div className="label-container-modal">
                <label htmlFor="phone">TELEPHONE</label>
                <input
                  type="number"
                  name="pseudo"
                  {...register("phone", {
                    required: true,
                  })}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.pseudo && (
                  <span>Le champ téléphone est obligatoire</span>
                )}
              </div>
              <div className="label-container-modal">
                <label htmlFor="adress">ADRESSE</label>
                <input
                  type="text"
                  name="pseudo"
                  {...register("adress", {
                    required: true,
                  })}
                  aria-invalid={errors.adress ? "true" : "false"}
                />
                {errors.pseudo && <span>Le champ adress est obligatoire</span>}
              </div>
              <div className="label-container-modal">
                <label htmlFor="password">MOT DE PASSE</label>
                <input
                  type={passwordIsVisible ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    required: true,
                  })}
                  aria-invalid={errors.creationPassword ? "true" : "false"}
                />
                {errors.password && (
                  <p>
                    Le mot de passe est obligatoire et doit contenir 8
                    caractères, une majuscule, une minuscule, un caractères
                    spécial et un chiffre
                  </p>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPasswordIsVisible((prevState) => !prevState)
                  }
                  className="thebutton"
                >
                  {passwordIsVisible
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"}
                </button>
              </div>
              <div className="label-container-modal">
                <label htmlFor="confirmPassword">CONFIRMER MOT DE PASSE</label>
                <input
                  type={passwordIsVisible ? "text" : "password"}
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    validate: () =>
                      watch("password") === watch("confirmPassword") ||
                      "Les mots de passe ne sont pas similaires",
                  })}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPasswordIsVisible((prevState) => !prevState)
                  }
                  className="thebutton"
                >
                  {passwordIsVisible
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"}
                </button>
              </div>
            </div>
            <div>
              <button type="submit" className="button-account">
                CREER UN COMPTE
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
}

export default ModalCreateAccount;
