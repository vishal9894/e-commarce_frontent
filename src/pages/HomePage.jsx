import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCircle, FaRegCircle } from 'react-icons/fa';
import headphone from "../assets/headphone.png";
import phone from "../assets/phone-removebg-preview.png";
import laptop from "../assets/laptop-removebg-preview.png";
import PhoneCard from '../components/PhoneCard';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: headphone,
      title: "Premium Headphones",
      description: "Experience crystal-clear sound with noise cancellation technology",
      buttonText: "Shop Now",
      gradient: "from-purple-600/70 to-pink-600/70"
    },
    {
      id: 2,
      image: phone,
      title: "Smartphone Pro",
      description: "Next-generation features with stunning camera quality",
      buttonText: "Learn More",
      gradient: "from-blue-600/70 to-cyan-600/70"
    },
    {
      id: 3,
      image: laptop,
      title: "High Performance Laptop",
      description: "Powerful performance for work, gaming & creativity",
      buttonText: "Explore",
      gradient: "from-amber-600/70 to-orange-600/70"
    }
  ];


  const [activeCategory, setActiveCategory] = useState(1);

  const topcategories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Mobile Phones"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Cosmetics"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Electronics"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Washing Machines"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Furniture"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Watches"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Home Decor"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Accessories"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className=" bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-3xl shadow-2xl">

            <div className="relative h-[420px] md:h-[380px] lg:h-[300px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-between px-10 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} z-0`}
                  ></div>

                  {/* Left Text */}
                  <div className="relative z-10  px-16 text-white">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-xl">
                      {slide.title}
                    </h2>
                    <p className="text-lg lg:text-xl mb-6 text-gray-100 drop-shadow-lg">
                      {slide.description}
                    </p>
                    <button className="bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {slide.buttonText}
                    </button>
                  </div>

                  {/* Right Image */}
                  <div className="relative z-10 flex justify-center items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-10 flex space-x-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="p-1 transition-transform duration-200 hover:scale-125"
                >
                  {index === currentSlide ? (
                    <FaCircle className="w-3 h-3 text-white" />
                  ) : (
                    <FaRegCircle className="w-3 h-3 text-white/70 hover:text-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-4 rounded-full shadow-xl transition-all duration-200"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-4 rounded-full shadow-xl transition-all duration-200"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

          </div>

        </div>

        <div className="">
          <PhoneCard />
        </div>
        <div className="">
          <div className=" mt-10 px-2 flex items-center justify-between w-full ">
            <h1 className='text-xl font-semibold text-gray-800 underline underline-offset-4'>Shop From <span className='text-blue-600'>Top Categories</span> </h1>
            <button

              className="text-blue-700 font-medium flex items-center gap-2 hover:underline"
            >
              View All
              <FaChevronRight />
            </button>
          </div>

          <div className="w-full justify-center flex py-6">


            <div className="flex gap-6 overflow-x-auto this-scrollbar scrollbar-hide py-2">
              {topcategories.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-2 min-w-[120px] cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-full object-cover shadow-md border group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
