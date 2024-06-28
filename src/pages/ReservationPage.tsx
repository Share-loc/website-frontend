const ReservationPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">Service de Réservation</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Notre service de réservation interne vous permet de réserver facilement nos produits ou services en ligne. En utilisant notre service de réservation, vous acceptez les présentes conditions.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Création de Compte</h2>
          <p className="mb-4">
            Pour effectuer une réservation, vous devez créer un compte en fournissant des informations personnelles telles que votre nom, votre adresse e-mail et un mot de passe.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Processus de Réservation</h2>
          <p className="mb-4">
            Pour effectuer une réservation, sélectionnez le produit ou service souhaité, choisissez une date et une heure disponibles, puis confirmez votre réservation. Vous recevrez un e-mail de confirmation une fois la réservation effectuée.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Modification et Annulation</h2>
          <p className="mb-4">
            Vous pouvez modifier ou annuler votre réservation en vous connectant à votre compte. Veuillez noter que des frais d'annulation peuvent s'appliquer en fonction des conditions spécifiques de chaque réservation.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Paiement</h2>
          <p className="mb-4">
            Les paiements pour les réservations sont effectués via notre plateforme de paiement sécurisée. Vous recevrez une facture par e-mail après la confirmation de votre réservation.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Sécurité des Données</h2>
          <p className="mb-4">
            Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé. Veuillez vous assurer que vos informations de connexion restent confidentielles.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant notre service de réservation, veuillez nous contacter à l'adresse suivante : reservations@example.com.
          </p>
        </section>
      </main>
    </div>
  )
}

export default ReservationPage