import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({
  image,
  faceBox,
  age,
  ageProb,
  genMas,
  genFem,
  ethFirst,
  ethFirstProb,
  ethSec,
  ethSecProb,
  ethThird,
  ethThirdProb,
}) => {
  //console.log(faceBox);
  if (!image) {
    return null;
  }
  return (
    <div>
      <div className="center ma height-adj">
        <div className="absolute mt2">
          <img src={image} alt="" width="auto" height="500px" id="inputImage" />
          <div
            className="bounding-box"
            style={{
              top: faceBox.topRow,
              right: faceBox.rightCol,
              bottom: faceBox.bottomRow,
              left: faceBox.leftCol,
            }}
          ></div>
        </div>
      </div>
      <div>
        <h3>
          Age: {age} - Probability: {Number(ageProb).toFixed(0)}%
        </h3>
        <h3>
          {Number(genMas).toFixed(0)}% Masculine - {Number(genFem).toFixed(0)} %
          Feminine
        </h3>
        <ul className="bio">
          <h3>Ethnicity:</h3>
          <li>
            <h3>
              {ethFirst} - Probability: {Number(ethFirstProb).toFixed(0)}%
            </h3>
          </li>
          <li>
            <h3>
              {ethSec} - Probability: {Number(ethSecProb).toFixed(0)}%
            </h3>
          </li>
          <li>
            <h3>
              {ethThird} - Probability: {Number(ethThirdProb).toFixed(0)}%
            </h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FaceRecognition;
