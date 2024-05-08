import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((data) => {
        setCountries(data.data);
      });
  }, []);
  return (
    <>
      <div>
        find countries
        <input
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          type="text"
        />
      </div>
      <Countries countries={countries} searchBar={searchBar} />
    </>
  );
};

export default App;
