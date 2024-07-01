const GDPRPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">RGPD et gestion des cookies</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Nous accordons une grande importance à la protection de vos données personnelles et à votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Collecte des données</h2>
          <p className="mb-4">
            Nous collectons différentes informations lorsque vous utilisez notre site, y compris des données personnelles telles que votre nom, adresse e-mail, adresse IP et d'autres informations pertinentes.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Utilisation des données</h2>
          <p className="mb-4">
            Les données collectées sont utilisées pour améliorer nos services, personnaliser votre expérience utilisateur, gérer vos commandes et communiquer avec vous.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Partage des données</h2>
          <p className="mb-4">
            Nous ne partageons pas vos données personnelles avec des tiers, sauf dans les cas nécessaires pour fournir nos services, respecter des obligations légales, ou avec votre consentement explicite.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p className="mb-4">
            Notre site utilise des cookies pour améliorer votre expérience en ligne. Les cookies sont de petits fichiers stockés sur votre appareil qui nous aident à analyser le trafic web et à personnaliser le contenu. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter votre utilisation de notre site.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Sécurité des données</h2>
          <p className="mb-4">
            Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
          <p className="mb-4">
            Conformément au RGPD, vous disposez de droits d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité de vos données personnelles. Pour exercer ces droits, veuillez nous contacter.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, veuillez nous contacter à l'adresse suivante : privacy@shareloc.com
          </p>
        </section>
      </main>
    </div>
  )
}

export default GDPRPage