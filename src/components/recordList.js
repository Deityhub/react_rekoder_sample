import React from "react";

import Record from "./record";

const RecordList = ({ audioSrc, deleteRecord, clipName }) =>
  audioSrc &&
  audioSrc.length > 0 ?
  audioSrc.map(({clipName, url}, index) => (
    <Record
      key={url}
      audioSrc={url}
      deleteRecord={deleteRecord.bind(null, url)}
      clipName={clipName}
    />
  )) : (<div className="record">You don't have any record</div>);
export default RecordList;
