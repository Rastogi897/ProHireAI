import React, { useRef, useState } from "react";

const Test = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [list, setList] = useState([]);

  const handlev1 = (e) => {
    setValue1(e.target.value);
  };

  const handlev2 = (e) => {
    setValue2(e.target.value);
  };

  const handleSubmit = () => {
    let listObj = {
      id: list.length,
      value1: value1,
      value2: value2,
    };
    setList((prevVal) => [...prevVal, listObj]);
    setValue1("");
    setValue2("");
  };

  return (
    <div>
      <input type="text" value={value1} onChange={handlev2}></input>
      <input type="text" value={value2} onChange={handlev1}></input>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Test;
