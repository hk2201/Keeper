import React, { useState } from "react";

function CreateArea(props) {
  const [content, setContent] = useState({
    title: "",
    desc: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContent((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleClick(event) {
    props.onAdd(content);
    setContent({
      title: "",
      desc: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          value={content.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="desc"
          value={content.desc}
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
