import React, { useState } from "react";
import axios from "axios"
function App() {

  const accessKey = "ukSmy95Un_nFHdBG3ueEJkPbTqEOAe4crdn4plVkC1A";
  const [search, setSearch] = useState("")
  const [photos, setPhotos] = useState([])
  

  const handleInput = (e)=> {
    setSearch(()=>{
      return e.target.value
    })
  }

  const getImages = () => {
    const urlApi = "https://api.unsplash.com/search/photos?page=1&query=" + search + "&client_id=" + accessKey;
    axios.get(urlApi).then((response) => {
      setPhotos(response.data.results)
      console.log(response.data.results[0])
    })
    setSearch('')
  }
  
  return (
    <div className="photos-search-wrapper">
      <h1>Photos Searching App</h1>
      <div className="photo-input-wrapper">
        <input type="text" placeholder="Photo Search..." value={search} onChange={handleInput} />
        <button onClick={getImages}>Search</button>
      </div>
      <div className="search-image-wrapper">
        {photos.map((photo) => (
          <div key={photo.id} className="search-image-box">
            <img src={photo.urls.small} alt={photo.alt_description } />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
