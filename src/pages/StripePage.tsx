const StripePage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">Service de Paiement</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Notre service de paiement utilise Stripe, une solution sécurisée et fiable, pour traiter vos paiements. En utilisant notre service de paiement, vous acceptez les présentes conditions.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Sécurité des Paiements</h2>
          <p className="mb-4">
            Stripe adhère aux normes de sécurité les plus strictes pour protéger vos informations de paiement. Toutes les transactions sont cryptées et sécurisées.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Données Personnelles</h2>
          <p className="mb-4">
            Nous ne conservons pas vos informations de carte bancaire. Toutes les données de paiement sont traitées directement par Stripe. Pour plus d'informations, veuillez consulter la politique de confidentialité de Stripe.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Processus de Paiement</h2>
          <p className="mb-4">
            Lors de la validation de votre commande, vous serez redirigé vers une page sécurisée Stripe pour effectuer le paiement. Une fois le paiement validé, vous recevrez une confirmation par e-mail.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Réclamations et Remboursements</h2>
          <p className="mb-4">
            Pour toute question ou réclamation concernant les paiements, veuillez nous contacter. En cas de remboursement, le montant sera recrédité sur votre carte bancaire via Stripe.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
          <p>
            Pour toute question relative au service de paiement, veuillez nous contacter à l'adresse suivante : payment@example.com.
          </p>
        </section>
      </main>
    </div>
  )
}

export default StripePage