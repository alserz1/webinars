import { useState } from "react";
import { Accordion } from "./Accordion";
import "./App.css";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="app">
      <Header searchValue={searchValue} onSearchCallback={setSearchValue} />
      <Accordion />
      <Content searchValue={searchValue} />
      <Footer />
    </div>
  );
}

export default App;
