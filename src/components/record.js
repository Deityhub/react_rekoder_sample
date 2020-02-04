import React from "react";

import Control from "./control";

const Record = ({ audioSrc, clipName, deleteRecord }) => {
  return (
    <section className="record">
      <article className="record__items">
        <p>{clipName}</p>
        <span className="record__control">
          <audio controls src={audioSrc} />
          <Control btState="Delete" onClick={deleteRecord} />
        </span>
      </article>
    </section>
  );
}

export default Record;
