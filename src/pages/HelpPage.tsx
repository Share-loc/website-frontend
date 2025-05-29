import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Alert from "@mui/material/Alert";
import apiClient from "@/service/api/apiClient";

const HelpPage = () => {
  const [impact, setImpact] = useState(1);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setImpact(newValue);
  };

  // Calculer la couleur en fonction de la gravité
  const getColor = () => {
    if (impact < 3) return "bg-green-500";
    if (impact === 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nom.length < 2 || prenom.length < 2) {
      setResponseMessage("Erreur : Le nom et le prénom incorrect");
      return;
    }

    // Vérification des champs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adresseMail)) {
      setResponseMessage("Erreur : Adresse email invalide.");
      return;
    }

    const data = {
      nom,
      prenom,
      adresse_mail: adresseMail,
      url,
      impact,
      message,
    };

    try {
      const response = await apiClient.post("/contactForm", data);

      if (response.data && response.data.message) {
      setResponseMessage(response.data.message);
      // Réinitialiser les champs du formulaire
      setNom("");
      setPrenom("");
      setAdresseMail("");
      setUrl("");
      setMessage("");
      setImpact(1); // Réinitialiser l'impact à sa valeur par défaut
      } else {
      setResponseMessage(response.data?.error || "Erreur inconnue.");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
      setResponseMessage("Erreur lors de l'envoi de l'email: " + (error as any).message);
      } else {
      setResponseMessage("Erreur lors de l'envoi de l'email.");
      }
    }
  };
  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(""); // Réinitialiser le message après 5 secondes
      }, 10000); // 5000 ms = 5 secondes

      return () => clearTimeout(timer); // Nettoyer le timer si le composant se démonte
    }
  }, [responseMessage]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 bg-gray-100 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-md p-5">
        <div className="w-full h-[300px] sm:h-[350px] lg:h-auto">
          <img
            src="/contact-team-shareloc.jpg"
            alt="Contact illustration"
            className="w-full object-cover h-full brightness-75 rounded-md"
          />
        </div>
        <div className="w-full my-auto">
          <img src="/logo.svg" alt="Contact illustration" className="mb-2" />
          <div className="inset-0 flex flex-col text-black mb-2">
            <h2 className="text-md font-semibold mb-2">
              Aidez-nous à vous aider !
            </h2>
            <p className="text-sm mb-3">
              Votre retour est essentiel pour nous permettre d'améliorer notre
              service. N'hésitez pas à nous contacter pour toute question,
              suggestion, ou pour signaler un problème.
            </p>
            <p className="text-sm">
              <strong>Indiquez la gravité du problème</strong> grâce au curseur
              ci-dessous : plus la note est élevée, plus le problème est
              critique.
            </p>
          </div>

          {responseMessage && (
            <Alert
              severity={
                responseMessage.includes("Erreur") ? "error" : "success"
              }
              className="my-3">
              <p>{responseMessage}</p>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="sm:grid sm:gap-6 sm:grid-cols-2">
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    id="first_name"
                    className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black">
                  Adresse mail *
                </label>
                <input
                  type="text"
                  value={adresseMail}
                  onChange={(e) => setAdresseMail(e.target.value)}
                  id="company"
                  className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black">
                  Url de la page
                </label>
                <input
                  type="text"
                  id="company"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium text-black">
                    Impact du problème sur votre expérience : {impact}
                  </p>
                  {/* Points de gravité */}
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-4 w-4 rounded-full ${
                          impact >= level ? getColor() : "bg-gray-300"
                        }`}></div>
                    ))}
                  </div>
                </div>

                {/* Slider MUI */}
                <Slider
                  value={impact}
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  className="mx-auto mb-3"
                  sx={{
                    width: "95%",
                    color:
                      impact < 3 ? "green" : impact === 3 ? "yellow" : "red",
                  }}
                />
              </div>
              {/* niveau de gravité */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black">
                  Message *
                </label>
                <textarea
                  className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-100 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black duration-300 ease-out">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
