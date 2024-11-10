import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [], // Array to hold all registered users
    user: null, // Current logged-in user information
    isLoggedIn: false, // Track login status
    message: "",
    signUpMessage: "",
  },
  reducers: {
    // User reducer to set user info
    setUser: (state, action) => {
      console.log(action.payload);
      const existingUserIndex = state.users.findIndex(
        (u) => u.email === action.payload.email // Assuming email is unique
      );
      

      if (existingUserIndex === -1) {
        // console.log(action.payload);
        
        // User doesn't exist, add to the users array
        state.users.push(action.payload);
        state.signUpMessage = "";
        console.log(state.users.length);
      }  else {
        // User already exists
        state.signUpMessage = "User already exists"; // Set an error message
        console.log("User already exists:", state.users[existingUserIndex]); // Log the existing user
      }

    },
    loginUser:(state,action)=>{
      console.log(action.payload);
      
      const existingUserIndex = state.users.findIndex(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      );
      if (existingUserIndex !== -1) {
        // User found, set login status to true
        state.isLoggedIn = true;
        state.user = state.users[existingUserIndex];
         // Set the logged-in user
        state.message = ""; // Clear any previous messages
        // Save user info to localStorage
    window.localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        // User not found or password mismatch
        state.message = "Invalid email or password";
        state.user = action.payload; // Set current user information
        state.isLoggedIn = false;
      }
    },

    // Action to log out the user
    logoutUser: (state) => {
      state.user = null; // Clear user information
      state.isLoggedIn = false; // Set login status to false
      window.localStorage.removeItem('user');
    },
    clearMessage: (state) => {
      state.signUpMessage = ""; // Clears the message
      state.message = "";  
    },
    setUserFromLocalStorage: (state)=>{
      var user = window.localStorage.getItem('user');
      if(user){
          user = JSON.parse(user);
          state.user = user;
          state.isLoggedIn = true;
      }else{
          state.user = null;
          state.isLoggedIn = false; 
      }
  }
  },
});

// Exporting actions
export const { setUser, logoutUser,loginUser,setUserFromLocalStorage,clearMessage } = authSlice.actions;

// Exporting reducer
export default authSlice.reducer;
