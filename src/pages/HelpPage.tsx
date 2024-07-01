const HelpPage = () => {
  return (
    <div className="bg-gray text-black shadow-md rounded-xl h-screen flex flex-col justify-center items-center">
      <header className="text-blue p-4">
        <h1 className="text-3xl font-bold">Page d'Aide</h1>
      </header>
      <main className="container mx-auto p-6 bg-gray mt-6 text-center">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">En cours de construction</h2>
          <p className="mb-4">
            Notre page d'aide est actuellement en cours de construction. Nous travaillons dur pour vous fournir les informations nécessaires le plus rapidement possible.
          </p>
          <p className="mb-4">
            En attendant, n'hésitez pas à nous contacter pour toute question ou assistance. Nous sommes là pour vous aider !
          </p>
          <p className="text-blue font-semibold">
            Contactez-nous à : support@shareloc.com
          </p>
        </section>
      </main>
    </div>
  )
}

export default HelpPage