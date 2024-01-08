import React, { useState } from "react";
import axios from "axios";

const IMAGES_PER_PAGE = 20;
function App() {

  const accessKey = "ukSmy95Un_nFHdBG3ueEJkPbTqEOAe4crdn4plVkC1A";
  const [search, setSearch] = useState("")
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);

  const handleInput = (e)=> {
    setSearch(()=>{
      return e.target.value
    })
  }

  const getImages = () => {
    const urlApi = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&per_page=${IMAGES_PER_PAGE}&client_id=${accessKey}`;
    axios.get(urlApi).then((response) => {
      setPhotos(response.data.results);
      setTotalPages(response.data.total_pages);
    });
    setSearch('')
  };
  
  
  return (
    <div className="wrapper">
    <h1 className="title">Photos Searching App</h1>
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Photo Search..."
        value={search}
        onChange={handleInput}
      />
      <button className="search-button" onClick={getImages}>
        Search
      </button>
    </div>
    <div className="image-wrapper">
      {photos.map((photo) => (
        <div className="image-box" key={photo.id}>
          <img src={photo.urls.small} alt={photo.alt_description} />
          <p>{photo.description}</p>
        </div>
      ))}
    </div>
    <div className="buttons-container">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)}>Previous</button>
      )}
      {page < totalPages && (
        <button onClick={() => setPage(page + 1)}>Next</button>
        
      )}
    </div>
  </div>
  
  );
}

export default App