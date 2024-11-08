import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useFilter } from "../context/FilterContext";
import Rating from "../rating/Rating";

const FoodItems = () => {
  const { selectedArea, sorted } = useFilter();                // filter context
  const [foodItems, setFoodItems] = useState([]);              // to get data from fetch api
  const [currentPage, setCurrentPage] = useState(1);           // for pagination
  const itemsPerPage = 8;                                      // food items on the current page
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mealDetails, setMealDetails] = useState(null);        // for modal
  const [loading, setLoading] = useState(true);                // loading state.. int true

  // use effect -> hook when area changes (dependency)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
      );
      const data = await response.json();
      setFoodItems(data.meals || []);
      setLoading(false);
      setCurrentPage(1);
    };

    fetchData();
  }, [selectedArea]);

  // show sorted items from start
  const sortedFoodItems = sorted
    ? foodItems.sort((a, b) => b.strMeal.localeCompare(a.strMeal))
    : foodItems.sort((a, b) => a.strMeal.localeCompare(b.strMeal));

  // pagination
  const totalPages = Math.ceil(sortedFoodItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoodItems.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = async (item) => {
    setModalIsOpen(true);

    // fetch meal details for modal using item id
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
    );
    const data = await response.json();
    setMealDetails(data.meals[0]);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setMealDetails(null);
  };

  // pagination

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // random promo texts array

  const promoTexts = [
    "RS 100 OFF ON 299",
    "ITEMS AT RS 99",
    "50% OFF UPTO 90",
    "BUY 1 GET 1 FREE",
    "LIMITED TIME OFFER!",
    "30% OFF",
    "RS 50 OFF",
    "",
  ];

  const getRandomPromoText = () => {
    const randomIndex = Math.floor(Math.random() * promoTexts.length);
    return promoTexts[randomIndex];
  };

  // random price between 50 and 250 (for modal)

  const getRandomPrice = () => {
    return Math.floor(Math.random() * (250 - 50 + 1)) + 50;
  };

  return (
    <div className="p-4 sm:p-4 md:p-8 container">
      <h2 className="text-xl font-bold mb-6">Food Items</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading food items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 lg:gap-14 sm:px-0">
          {currentItems.map((item) => (
            <div
              className="bg-white relative rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform cursor-pointer overflow-hidden"
              onClick={() => openModal(item)}
            >
              <div className="relative w-full h-28 sm:h-36 md:h-40 lg:h-44">
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* black overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-full"></div>

                {/* random promo text */}
                <div className="absolute bottom-1 left-2 text-white font-extrabold text-xs sm:text-sm lg:text-base md:px-2 bg-opacity-90 rounded-md p-2">
                  {getRandomPromoText()}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-xs md:text-lg font-bold text-gray-900 leading-tight line-clamp-1">
                  {item.strMeal}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {/* rating component  */}
                  <Rating />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* pagination */}
      <div className="flex justify-center items-center mt-8 space-x-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 border-2 ${
            currentPage === 1
              ? "border-gray-300 text-gray-300 cursor-not-allowed"
              : "border-[#FF5500] text-[#FF5500] hover:border-transparent hover:bg-[#FF5500] hover:text-white"
          }`}
        >
          <AiOutlineLeft className="text-xl" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 border-2 ${
            currentPage === totalPages
              ? "border-gray-300 text-gray-300 cursor-not-allowed"
              : "border-[#FF5500] text-[#FF5500] hover:border-transparent hover:bg-[#FF5500] hover:text-white"
          }`}
        >
          <AiOutlineRight className="text-xl" />
        </button>
      </div>

      {/* food details modal */}
      {modalIsOpen && mealDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-0">
          <div className="bg-white rounded-lg p-4 md:p-6 relative max-w-sm w-[80%] mx-auto shadow-xl transition-transform transform scale-100 duration-200">
            <img
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              className="w-full h-36 object-cover rounded-t-lg mb-4 shadow-md"
            />
            <h2 className="text-lg md:text-xl font-bold mb-2 text-center text-gray-900">
              {mealDetails.strMeal}
            </h2>
            <div className="flex justify-center mb-2">
              {/* rating component */}
              <Rating />
            </div>
            <p className="text-gray-600 sm:text-lg text-sm text-center mb-4">
              {`Discover the flavors of ${mealDetails.strMeal} with a delightful mix of spices and ingredients.`}
            </p>
            <p className="text-gray-500 text-sm mb-4 text-center">
              <strong>Category:</strong> {mealDetails.strCategory} |{" "}
              <strong>Origin:</strong> {mealDetails.strArea}
            </p>

            {/* random food price */}
            <p className="text-[#FF5000] text-xl font-bold text-center mb-4">
              <span className="text-gray-800 font-semibold">Price:</span> ₹
              {getRandomPrice()}
            </p>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => alert(`${mealDetails.strMeal} added to cart!`)}
                className="bg-[#FF5500] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#E04C00] transition-all duration-300 font-semibold"
              >
                Add to Cart
              </button>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 flex items-center justify-center transition-all duration-300"
            >
              <AiOutlineClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItems;
