import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineReviews } from "react-icons/md";

const TestimonialsCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [testimonialLenght, setTestimonialLenght] = useState(3);
    
    const testimonials = [
      {
        id: 1,
        name: "Sophie Martin",
        location: "Paris",
        text: "Share Loc m'a permis de louer une perceuse pour un projet de bricolage sans avoir à en acheter une. Le processus était simple et rapide !",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 2,
        name: "Thomas Dubois",
        location: "Lyon",
        text: "Grâce à Share Loc, j'ai pu rentabiliser mon appareil photo que j'utilise rarement. Une excellente façon de gagner un peu d'argent tout en aidant les autres !",
        rating: 4,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 3,
        name: "Emma Petit",
        location: "Bordeaux",
        text: "J'ai loué un vélo électrique pour une semaine de vacances. C'était beaucoup moins cher que les locations traditionnelles et le propriétaire était très sympa !",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 4,
        name: "Lucas Moreau",
        location: "Marseille",
        text: "Je mets régulièrement mes outils de jardinage en location sur Share Loc. La plateforme est intuitive et le support client est très réactif.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 5,
        name: "Julie Leroy",
        location: "Nantes",
        text: "J'ai pu louer un appareil à raclette pour une soirée entre amis. Tout s'est très bien passé et le prix était très raisonnable !",
        rating: 5,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        id: 6,
        name: "Antoine Girard",
        location: "Toulouse",
        text: "Share Loc m'a permis de trouver rapidement une tente pour un week-end camping improvisé. Service impeccable !",
        rating: 4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ];
  
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setTestimonialLenght(1);
            } else if (window.innerWidth < 769) {
                setTestimonialLenght(1);
            } else if (window.innerWidth < 1024) {
                setTestimonialLenght(2);
            } else if (window.innerWidth < 1280) {
                setTestimonialLenght(3);
            } else {
                setTestimonialLenght(3);
            }
        };
    
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
    const totalSlides = Math.ceil(testimonials.length / testimonialLenght);
    
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
    
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };
  
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-5 align-center items-center">
                      <MdOutlineReviews className="text-[#F8B24E] text-2xl md:text-3xl" />
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Ce que nos utilisateurs disent
                      </h2>
                    </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                    {testimonials
                      .slice(
                        slideIndex * testimonialLenght,
                        slideIndex * testimonialLenght + testimonialLenght
                      )
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                          />
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={`${
                                  i < testimonial.rating
                                    ? "text-[#F8B24E] fill-[#F8B24E]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm italic mb-4">
                            "{testimonial.text}"
                          </p>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-sm">
                            {testimonial.location}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10"
              disabled={currentSlide === 0}>
              <ChevronLeft
                size={24}
                className={`${
                  currentSlide === 0 ? "text-gray-400" : "text-gray-700"
                }`}
              />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10"
              disabled={currentSlide === totalSlides - 1}>
              <ChevronRight
                size={24}
                className={`${
                  currentSlide === totalSlides - 1
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-center mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide === index ? "bg-[#3AAFAF]" : "bg-[#F3F3F3]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialsCarousel;