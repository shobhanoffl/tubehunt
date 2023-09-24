import React from 'react';
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

export default function Landing() {
  return (
    <div>
        <NavigationBar />
        <SearchBar />
        <Footer />
    </div>
  )
}
