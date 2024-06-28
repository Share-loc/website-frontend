const SecurityPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">Connexion et Sécurité</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Nous prenons la sécurité de vos informations personnelles très au sérieux. Cette page décrit nos pratiques en matière de connexion et de sécurité, y compris l'utilisation de JSON Web Tokens (JWT) pour l'authentification.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Création de Compte</h2>
          <p className="mb-4">
            Pour accéder à certains de nos services, vous devez créer un compte en fournissant des informations personnelles telles que votre adresse e-mail et un mot de passe. Veuillez choisir un mot de passe sécurisé et unique.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Authentification via JWT</h2>
          <p className="mb-4">
            Nous utilisons JSON Web Tokens (JWT) pour authentifier les utilisateurs. Lors de la connexion, un JWT est généré et envoyé au client. Ce token doit être inclus dans les requêtes suivantes pour accéder aux ressources protégées.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Sécurité des Données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre l'accès non autorisé, la divulgation, la modification ou la destruction. Assurez-vous de garder vos informations de connexion confidentielles.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Gestion des Sessions</h2>
          <p className="mb-4">
            Les JWT ont une durée de vie limitée pour réduire le risque d'utilisation non autorisée. À l'expiration du token, vous devrez vous reconnecter pour obtenir un nouveau token. Veuillez vous déconnecter après chaque session pour garantir la sécurité de votre compte.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Conseils de Sécurité</h2>
          <p className="mb-4">
            Utilisez un mot de passe fort et unique pour votre compte. Ne partagez pas vos informations de connexion avec d'autres personnes. Soyez vigilant contre les tentatives de phishing et les logiciels malveillants.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant la connexion et la sécurité, veuillez nous contacter à l'adresse suivante : security@shareloc.com.
          </p>
        </section>
      </main>
    </div>

  )
}

export default SecurityPage