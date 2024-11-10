import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    error: "",
    bookmarks: [
        
        
    ],
  },
  reducers: {
    // addBookmark: (state, action) => {
    //   if (state.bookmarks.length < 5) {
    //     state.bookmarks.push({
    //       ...action.payload,
    //       addedTime: new Date().toLocaleString(), // Add the current time
    //     });
    //     state.error = ""; // Clear any previous error
    //   } else {
    //     state.error = "You can only add up to 5 bookmarks."; // Set error when limit is exceeded
    //   }
    // },
    addBookmark: (state, action) => {
      const { email, url, title } = action.payload; // Add email to the payload
      const userBookmarks = state.bookmarks.filter(b => b.email === email);
    console.log([userBookmarks]);
    
      if (userBookmarks.length < 5) {
        state.bookmarks.push({
          email, // Associate bookmark with the user
          url,
          title,
          addedTime: new Date().toLocaleString(), // Add the current time
        });
        state.error = ""; // Clear any previous error
        console.log([...state.bookmarks]);
        
      } else {
        state.error = "You can only add up to 5 bookmarks."; // Set error when limit is exceeded
      }
    },
    
    editBookmark: (state, action) => {
      const { index, newTitle, newUrl } = action.payload;
      state.bookmarks[index] = {
        ...state.bookmarks[index],
        title: newTitle,
        url: newUrl,
      }; // Update title and URL at the specific index
    },
    deleteBookmark: (state, action) => {
      state.bookmarks.splice(action.payload, 1); // Remove bookmark by index
      state.error = ""; // Clear any error when a bookmark is deleted
    },
    clearError: (state) => {
      state.error = ""; // Action to manually clear the error if needed
    },
  },
});

// Export actions
export const { addBookmark, editBookmark, deleteBookmark, clearError } =
  bookmarkSlice.actions;

// Export reducer
export default bookmarkSlice.reducer;
