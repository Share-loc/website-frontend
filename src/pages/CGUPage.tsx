const CGUPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
          <h1 className="text-3xl font-bold">Conditions Générales d'Utilisation</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
          <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                  Bienvenue sur notre site web. En utilisant notre site, vous acceptez ces conditions générales d'utilisation. Veuillez les lire attentivement.
              </p>
          </section>
          <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">2. Utilisation du site</h2>
              <p className="mb-4">
                  Vous vous engagez à utiliser notre site conformément aux lois et règlements applicables. Vous ne devez pas utiliser notre site à des fins illégales ou non autorisées.
              </p>
          </section>
          <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">3. Contenu du site</h2>
              <p className="mb-4">
                  Tout le contenu présent sur notre site est protégé par les lois sur le droit d'auteur. Vous ne devez pas reproduire, distribuer ou exploiter ce contenu sans notre autorisation.
              </p>
          </section>
          <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">4. Limitation de responsabilité</h2>
              <p className="mb-4">
                  Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de notre site. Nous ne garantissons pas l'exactitude ou la complétude des informations fournies.
              </p>
          </section>
          <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">5. Modifications des CGU</h2>
              <p className="mb-4">
                  Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur notre site.
              </p>
          </section>
          <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
              <p>
                  Si vous avez des questions concernant ces conditions, veuillez nous contacter à l'adresse suivante : contact@shareloc.com
              </p>
          </section>
      </main>
    </div>
  )
}

export default CGUPage