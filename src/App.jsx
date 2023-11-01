import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { fetchDataFromApi } from './utils/api';
import Header from './components/header/header';
import Footer from './components/footer/Footer';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResults from './pages/searchResults/SearchResults';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);


  useEffect(() => {
    apiTesting();
    genresCall();
  }, []);

  const apiTesting = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",

      }
      dispatch(getApiConfiguration(url));

    } catch (error) {
      console.error("API error:", error);
    }
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push((fetchDataFromApi(`/genre/${url}/list`)));
    });

    const data = await Promise.all(promises);


    data.forEach(({ genres }) => {
      genres.forEach((item) => { allGenres[item.id] = item });
    });

    dispatch(getGenres(allGenres));

  }

  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />
    </Router>

  )
}

export default App
