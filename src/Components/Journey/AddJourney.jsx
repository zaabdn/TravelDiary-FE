import React, { useState } from "react";
import "./Journey.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import { API } from "../../Config/api";

const AddJourney = () => {
  let history = useHistory();
  const [journey, setJourney] = useState({
    title: "",
    images: "",
    story: "",
    userId: localStorage.id,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const submitJourney = (e) => {
    e.preventDefault();
    const dataJourney = {
      title: journey.title,
      images: journey.images,
      story: journey.story,
      userId: journey.userId,
    };
    API.post("journey", dataJourney, config)
      .then((result) => {
        history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditor = (e, editor) => {
    setJourney({ ...journey, content: journey });
  };

  const handleChange = (e) => {
    setJourney({ ...journey, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-journey">
      <h1>New Journey</h1>
      <form onSubmit={submitJourney}>
        <div className="form-journey top">
          <h4>Title</h4>
          <input
            type="text"
            value={journey.title}
            onChange={(e) => handleChange(e)}
            name="title"
          />
        </div>
        <div className="form-journey">
          <h4>Image</h4>
          <input
            type="text"
            placeholder="example: http://zainalabidin.com/gunung.png"
            value={journey.images}
            onChange={(e) => handleChange(e)}
            name="images"
          />
        </div>
        <div className="form-journey">
          <Editor
            wrapperClassName="rich-editor demo-wrapper"
            editorClassName="demo-editor"
            placeholder="Write your beatiful story"
            onChange={handleEditor}
          />
        </div>
        <div className="form-journey">
          <button type="submit" className="btn-post">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJourney;
