import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Filter from "./components/Filter";
import FoodItems from "./components/FoodItems";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <>
      <FilterProvider>
        <Header />
        <Filter />
        <FoodItems />
        <Footer />
      </FilterProvider>
    </>
  );
}

export default App;
