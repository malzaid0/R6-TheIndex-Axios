import React, { useState, useEffect } from "react";
import axios from "axios";

import authors from "./data.js";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectAuthor = author => {
    setLoading(true)
    fetchAuthor(author)
  }

  const unselectAuthor = () => setCurrentAuthor(null);

  useEffect(() => {
    console.log('useEffect has been called!');
    fetchAuthors()
  },[]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/")
      setAuthors(response.data)
      setLoading(false)
    } catch (e) {
      console.log("Something went wrong!!")
    }
  };
  const fetchAuthor = async (author) => {
    try {
      const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`)
      setCurrentAuthor(response.data)
      setLoading(false)
    } catch (e) {
      console.log("Something went wrong!!")
    }
  };


  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      if (loading){
        return <h1>loading</h1>
      }
      else {
        return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
      }
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
