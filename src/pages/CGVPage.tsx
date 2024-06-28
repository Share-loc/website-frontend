const CGVPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">Conditions Générales de Vente</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Les présentes conditions générales de vente régissent les relations contractuelles entre notre entreprise et ses clients. En passant commande, vous acceptez ces conditions sans réserve.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Commande</h2>
          <p className="mb-4">
            Toute commande passée sur notre site implique l'acceptation intégrale des présentes conditions générales de vente. Nous nous réservons le droit de refuser toute commande pour des motifs légitimes.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Prix</h2>
          <p className="mb-4">
            Les prix de nos produits sont indiqués en euros, toutes taxes comprises. Nous nous réservons le droit de modifier nos prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Paiement</h2>
          <p className="mb-4">
            Le paiement s'effectue en ligne par carte bancaire via une plateforme sécurisée. Les informations de paiement ne sont pas conservées par notre site.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Livraison</h2>
          <p className="mb-4">
            Les produits sont livrés à l'adresse de livraison indiquée lors de la commande. Les délais de livraison sont donnés à titre indicatif et peuvent varier en fonction de la disponibilité des produits et du transporteur.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Rétractation</h2>
          <p className="mb-4">
            Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités. Les frais de retour sont à votre charge.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Garantie</h2>
          <p className="mb-4">
            Tous nos produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés, conformément aux dispositions légales en vigueur.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>
            Pour toute question ou réclamation, veuillez nous contacter à l'adresse suivante : support@example.com.
          </p>
        </section>
      </main>
    </div>
  )
}

export default CGVPage