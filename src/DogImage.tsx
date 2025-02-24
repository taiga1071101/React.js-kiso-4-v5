import { useState } from "react";
export const DogImage = () => {
  const [dogUrl, setDogUrl] = useState("https://images.dog.ceo/breeds/poodle-miniature/n02113712_5675.jpg");

  const fetchDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        setDogUrl(data.message);
      });
  }

  return (
    <>
      <div>
        <h1>犬の画像表示サイト</h1>
        <button onClick={fetchDogImage}>更新</button>
      </div>
      <div>
        <img src={dogUrl} ></img>
      </div>
    </>
  );
};