import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import { useRef, useCallback, useState, useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Loader from "./Loader";
import { v4 as uuid } from "uuid";
import { Modal } from "./Modal/Modal";

const Gallery = (props) => {
  const { loading, runSearch, upDatePageNumber, pageNumber, resetPageNumber } = useContext(PhotoContext);
  const [modal, setModal] = useState(false);
  const [imgSource, setImgSource] = useState(false);
  const results = props.data;
  const currentSearchTerm = props.searchTerm;

  const toggleModal = () => {
    setModal(!modal);
  }
  const handleImageClick = (event) => {
    setImgSource (event.target.src.replace('_w.jpg','_b.jpg'));
    toggleModal();
  }
  
  const observer = useRef();
  
  const lastImageElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          upDatePageNumber();
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading]
  );

  useEffect(() => {
    resetPageNumber();
  }, [currentSearchTerm]);

  useEffect(() => {
    runSearch(currentSearchTerm);
  }, [pageNumber]);

  let images;
  let noImages;
  // map variables to each item in fetched image array and return image component
  if (results.length > 0) {
    images = results.map((image, index) => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let key = uuid();
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
      if (results.length === index + 1) {
        return (
          <Image
            imageRef={lastImageElementRef}
            url={url}
            key={id}
            alt={title}
          />
        );
      } else {
        return <Image onImageClick = {handleImageClick} url={url} key={key} alt={title} />;
      }
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <>
      <div>
        <ul>{images}</ul>
        <Loader />
      </div>
      <Modal modal={modal} toggleModal={toggleModal} imgSource={imgSource}/>
    </>
  );
};

export default Gallery;
