// import { useReducer } from "react";
// import { User } from "../types/customTypes";
// import { makeRequest } from "../axios";


// type UserAction = Partial<User>;

// type Action =
//   | { type: 'UPDATE_USER'; payload: UserAction; field: }
//   | { type: 'UPDATE_COVER_PIC'; payload: string }
//   | { type: 'UPDATE_PROFILE_PIC'; payload: string };

// const userReducer = (state: User, action: Action): User => {
//   switch (action.type) {
//     case 'UPDATE_USER':
//       return { ...state, ...action.payload };
//     case 'UPDATE_COVER_PIC':
//       return { ...state, coverPic: action.payload };
//     case 'UPDATE_PROFILE_PIC':
//       return { ...state, profilePic: action.payload };
//     default:
//       return state;
//   }
// };

// const useUserReducer = (initialUser: User) => {
//   const [user, dispatch] = useReducer(userReducer, initialUser);

//   const updateUser = (updatedUser: UserAction) => {
//     dispatch({ type: 'UPDATE_USER', payload: updatedUser });
//   };

//   const updateCoverPic = (file: File) => {
//     dispatch({ type: 'UPDATE_COVER_PIC', payload: file });
//   };

//   const updateProfilePic = (file: File) => {
//     dispatch({ type: 'UPDATE_PROFILE_PIC', payload: file });
//   };

//   return { user, updateUser, updateCoverPic, updateProfilePic };
// };

// export default useUserReducer;