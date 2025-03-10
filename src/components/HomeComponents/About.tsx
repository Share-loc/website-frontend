const AboutSection = () => {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">À propos de Share Loc</h2>
            <div className="w-20 h-1 bg-[#3AAFAF] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="L'équipe Share Loc" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Notre mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chez Share Loc, nous croyons en une économie plus collaborative et durable. Notre mission est de permettre à chacun de louer facilement des objets du quotidien plutôt que de les acheter, réduisant ainsi la surconsommation et l'impact environnemental.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fondée en 2023, notre plateforme met en relation des personnes qui souhaitent rentabiliser leurs biens inutilisés avec celles qui préfèrent louer plutôt qu'acheter pour un usage ponctuel.
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Nos valeurs</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed">
                <li>Durabilité et respect de l'environnement</li>
                <li>Économie collaborative et partage</li>
                <li>Confiance et transparence</li>
                <li>Innovation et simplicité d'utilisation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AboutSection;