import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const upDatePageNumber = () => {
    setPageNumber(prevpage => prevpage +1);
  }

  const resetPageNumber = () => {
    setImages([]);
    setPageNumber(1);
  }


  const runSearch = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=25&page=${pageNumber}&format=json&nojsoncallback=1`
      )
      .then(response => {
        setImages(prevImages => [...prevImages,...response.data.photos.photo]);
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };
  return (
    <PhotoContext.Provider value={{ images, loading, runSearch, upDatePageNumber, resetPageNumber, pageNumber }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
