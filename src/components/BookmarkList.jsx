import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBookmark, editBookmark } from "../store/bookmarkSlice";
import Navbar from './Navbar'
import checkAuth from "./checkAuth";

const BookmarkListingPage = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarksPerPage = 2; // Display one bookmark per page

  // Get the current bookmark for the current page
  const currentBookmark = bookmarks.slice(
    (currentPage - 1) * bookmarksPerPage,
    currentPage * bookmarksPerPage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(bookmarks.length / bookmarksPerPage);

  // Edit bookmark handler
  const handleEditBookmark = (index) => {
    const globalIndex = (currentPage - 1) * bookmarksPerPage + index;
    const newTitle = prompt("Enter new title:", bookmarks[globalIndex].title);
    const newUrl = prompt("Enter new URL:", bookmarks[globalIndex].url);

    if (newTitle && newUrl) {
      dispatch(editBookmark({ index: globalIndex, newTitle, newUrl }));
    }
  };
  const handleDeleteBookmark = (index) => {
    const globalIndex = (currentPage - 1) * bookmarksPerPage + index; // Get the correct global index
    dispatch(deleteBookmark(globalIndex));
  };
  return (
    <div>
        <Navbar/>
 <div className="container mt-5">
      <h2 className="text-center mb-4">Your Bookmarks</h2>

      {currentBookmark.length > 0 ? (
        <div>
          <ul className="list-group">
            {currentBookmark.map((bookmark, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                <div>
                  <strong>{bookmark.title}</strong>
                  <br />
                  <Link to={bookmark.url} target="_blank">
                    {bookmark.url}
                  </Link>
                  <br />
                  <small>Added: {bookmark.addedTime}</small>
                </div>

                <div>
                  <button
                    className="btn btn-sm mr-3"
                    onClick={() => handleEditBookmark(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDeleteBookmark(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">No bookmarks added yet!</p>
      )}
    </div>
    </div>
   
  );
};

export default checkAuth(BookmarkListingPage);
