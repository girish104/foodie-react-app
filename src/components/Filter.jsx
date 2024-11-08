import React, { useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa"; // react icons
import { useFilter } from "../context/FilterContext";

const Filter = () => {
  const { setSelectedArea, setSorted, sorted } = useFilter();    // from filter context (useFilter)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // select by area
  const areas = [
    "Indian",
    "Italian",
    "French",
    "Spanish",
    "Canadian",
    "Chinese",
  ];

  // for local use... change state only when apply btn is clicked
  const [selectedArea, setSelectedAreaFilter] = useState("Indian");

  const handleAreaSelection = (area) => {
    setSelectedAreaFilter(area);
  };

  const handleApplySelection = () => {
    setSelectedArea(selectedArea);            
    setIsFilterOpen(false);
  };

  // handle sorting 
  const handleSortToggle = () => {
    setSorted((prev) => !prev);
  };

  return (
    <div className="bg-gray-50">
      <div className="filter-section p-4 md:p-8 container relative">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Browse & Order Top Dishes
        </h2>
        <div className="filter-tags flex flex-wrap gap-2 mt-4 relative text-xs font-medium">
          <button
            className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 flex items-center gap-2 hover:bg-[#FF5500] hover:text-white transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter <PiSlidersHorizontalBold />
          </button>

          <button
            className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 flex items-center gap-2 hover:bg-[#FF5500] hover:text-white transition"
            onClick={handleSortToggle}
          >
            Sort By {sorted ? "A-Z" : "Z-A"} <FaAngleDown />
          </button>

          <span className="bg-white shadow-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-[#FF5500] hover:text-white transition cursor-pointer">
            Fast Delivery
          </span>
          <span className="bg-white shadow-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-[#FF5500] hover:text-white transition cursor-pointer">
            New on Swiggy
          </span>
          <span className="bg-white shadow-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-[#FF5500] hover:text-white transition cursor-pointer">
            Ratings 4.0+
          </span>
          <span className="bg-white shadow-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-[#FF5500] hover:text-white transition cursor-pointer">
            Pure Veg
          </span>
          <span className="bg-[#FF5500] text-white shadow-sm border border-gray-300 px-4 py-2 rounded-full transition cursor-pointer">
            Offers
          </span>

          {/* select by area dropdown */}
          {isFilterOpen && (
            <div className="dropdown bg-white p-4 md:p-6 rounded-lg shadow-lg absolute top-full left-0 mt-2 w-64 z-10 border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">Select By Area</h3>
              <div className="flex flex-col gap-2">
                {areas.map((area) => (
                  <label
                    key={area}
                    className={`flex items-center text-sm cursor-pointer hover:bg-gray-100 rounded-md p-2 transition duration-200 ${
                      selectedArea === area ? "bg-blue-100" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="area"
                      value={area}
                      checked={selectedArea === area}
                      onChange={() => handleAreaSelection(area)}
                      className="mr-2"
                    />
                    <span className="text-gray-800">{area}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleApplySelection}
                className="mt-4 bg-[#FF5500] text-white px-4 py-2 rounded-md transition duration-200 w-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
