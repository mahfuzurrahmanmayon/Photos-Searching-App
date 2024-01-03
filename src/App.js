import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
  <Wrapper>
    <Title>Photos Searching App</Title>
    <InputWrapper>
      <Input type="text" placeholder="Photo Search..." value={search} onChange={handleInput} />
      <SearchButton onClick={getImages}>Search</SearchButton>
    </InputWrapper>
    <ImageWrapper>
      {photos.map((photo) => (
        <ImageBox key={photo.id}>
          <img src={photo.urls.small} alt={photo.alt_description} />
          <p>{photo.description}</p>
        </ImageBox>
      ))}
    </ImageWrapper>
  </Wrapper>
  );
}


const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ImageBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
  }

  p {
    padding: 10px;
    font-size: 14px;
    color: #333;
  }
`;

export default App