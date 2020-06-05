import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const CLASSIFIER_BACKEND_URL = "http://localhost:9001/image-from-url";

const App = () => {
  const [url, setUrl] = useState("");
  const [classification, setClassification] = useState(null);
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const classify = () => {
    axios
      .post(CLASSIFIER_BACKEND_URL, { url })
      .then((response) => {
        setClassification(response.data.classification);
        setDisplaySpinner(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <h1>Image classifier</h1>
      <p>Pass image source url and give the classifier a try to guess!</p>
      <input
        style={{ width: 50 + "%" }}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button
        onClick={() => {
          setDisplaySpinner(true);
          setClassification(null);
          classify(url);
        }}
      >
        Classify
      </button>
      <br></br>
      {classification ? (
        <div>
          <br />
          <img alt="" src={url}></img>

          <p>Classifier results:</p>
          <p>
            Class Name: <b>{classification[0].className}</b> with probability:{" "}
            <b>{classification[0].probability}</b>
          </p>
          <p>
            Class Name: <b>{classification[1].className}</b> with probability:{" "}
            <b>{classification[1].probability}</b>
          </p>
          <p>
            Class Name: <b>{classification[2].className}</b> with probability:{" "}
            <b>{classification[2].probability}</b>
          </p>
        </div>
      ) : (
        <div>
          {displaySpinner ? (
            <div>
              <p>Give it a while, proccessing...</p>{" "}
              <div className="spinner"></div>{" "}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
