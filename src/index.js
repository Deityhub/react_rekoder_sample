import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import RecordList from "./components/recordList";
import Control from "./components/control";
import "./styles.css";

function App() {
  let [error, setError] = useState(null);
  let [audioSrc, setSrc] = useState([]);

  useEffect(() => {
    //recorderFunc will be set on componentDidMount lifecycle hook
    recorderFunc(setError, setSrc, audioSrc);
  }, [audioSrc]); //only re-run useEffect when audioSrc state changes

  function deleteRecord(src) {
    setSrc(audioSrc.filter(({ url }) => url !== src));
  }

  return error === "error" ? (
    <div> Your browser's not supported</div>
  ) : (
    <div className="container">
      <span className="container--control">
        <Control btState="Start" onClick={startRecording} />
        <Control btState="Stop" onClick={stopRecording} />
      </span>
      <RecordList
        audioSrc={audioSrc}
        deleteRecord={deleteRecord}
        clipName={clipName}
      />
    </div>
  );
}

let mediaRecorder;
let chunks = [];
let clipName = "";

function startRecording() {
  if (!mediaRecorder) return;

  mediaRecorder.start();
  console.log(mediaRecorder.state);
  console.log("recorder started :)");
}

function stopRecording() {
  if (!mediaRecorder) return;
  if (mediaRecorder.state === "inactive") return;

  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
}

function recorderFunc(setError, setSrc, audioSrc) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        }
      )

      // Success callback
      .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function(e) {
          let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          clipName = prompt("Name for this audio record ?");
          setSrc([
            ...audioSrc,
            { clipName, url: window.URL.createObjectURL(blob) }
          ]);
          chunks = [];
        };
      })

      // Error callback
      .catch(function(err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
    setError("error");
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
