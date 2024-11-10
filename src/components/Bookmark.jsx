import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, clearError } from "../store/bookmarkSlice";
import { Link } from "react-router-dom";
import checkAuth from "./checkAuth";
import './Bookmark.css'; // Import the CSS file

const BookmarkComponent = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Access bookmarks and error from the Redux store
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const user = useSelector((state) => state.auth.user);

  const error = useSelector((state) => state.bookmarks.error);

  const handleAddBookmark = (e) => {
    e.preventDefault();

    if (url && title) {
      dispatch(addBookmark({email:user.email ,url, title }));
      setUrl("");
      setTitle("");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  }, [error, dispatch]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Bookmark Manager</h2>
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Display error message */}
              <form onSubmit={handleAddBookmark}>
                <div className="mb-3">
                  <label className="form-label">URL:</label>
                  <input
                    type="url"
                    className="form-control"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn text-white w-100">
                  Add Bookmark
                </button>
              </form>
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search by title or URL"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="list-group">
                  {bookmarks
                    .filter((bookmark) => bookmark.email === user.email) // Filter bookmarks by user's ID
                    .filter(
                      (bookmark) =>
                        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((bookmark) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={bookmark.id} // Use id instead of index
                      >
                        <div>
                          <strong>{bookmark.title}</strong>
                          <br />
                          <Link
                            to={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {bookmark.url}
                          </Link>
                          <br />
                        </div>
                        <small>Added: {bookmark.addedTime}</small>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(BookmarkComponent);
