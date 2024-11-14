// import db from '../database/database.js';
// import {collection, addDoc, query, getDocs, orderBy, doc, deleteDoc} from 'firebase/firestore';


// export async function registerUser(formData){
//     const colRef = collection(db, 'users');
//     try {
//       await addDoc(colRef, {
//         names: formData.names,
//         email: formData.email,
//         password: formData.password,
//       });
  
      
//       return true;
//     } catch (error) {
//       console.error("Error registering user:", error.message);
//       return false;
//     }
//   }


//   export async function Checker(formData) {
//     const names = formData.names;
//     const password = formData.password; 
//     const colRef = collection(db, 'users');
//     const userQuery = query(colRef, orderBy("names"));
//     const querySnapshot = await getDocs(userQuery);
//     let found = false;

//     querySnapshot.forEach((doc) => {
//         const user = doc.data();
//         if (user.names === names && user.password === password) {
//             found = true;
//             return;
//         }
//     });

//     return found;
// }


// export async function addReview(movieName, reviewText) {
//   const docRef = await addDoc(collection(db, 'reviews'), {
//     movieName: movieName,
//     reviewText: reviewText,
//     createdAt: new Date() 
//   });
// }



// // Function to get all reviews
// export async function getAllReviews() {
//   const colRef = collection(db, 'reviews');
//   try {
//     const querySnapshot = await getDocs(query(colRef, orderBy('createdAt', 'desc')));
//     const reviews = [];
//     querySnapshot.forEach((doc) => {
//       reviews.push({ id: doc.id, ...doc.data() });
//     });
//     return reviews;
//   } catch (error) {
//     console.error("Error getting reviews:", error.message);
//     return [];
//   }
// }

// // Function to delete a review
// export async function deleteReview(reviewId) {
//   try {
//     const docRef = doc(db, 'reviews', reviewId);
//     await deleteDoc(docRef);
//     return true;
//   } catch (error) {
//     console.error("Error deleting review:", error.message);
//     return false;
//   }
// }





import{ db } from '../database/database.js';
import { collection, addDoc, query, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore';

export async function registerUser(formData) {
  const colRef = collection(db, 'users');
  try {
    await addDoc(colRef, {
      names: formData.names,
      email: formData.email,
      password: formData.password,
    });
    return true;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return false;
  }
}

export async function Checker(formData) {
  const names = formData.names;
  const password = formData.password; 
  const colRef = collection(db, 'users');
  const userQuery = query(colRef, orderBy("names"));
  const querySnapshot = await getDocs(userQuery);
  let found = false;

  querySnapshot.forEach((doc) => {
    const user = doc.data();
    if (user.names === names && user.password === password) {
      found = true;
      return;
    }
  });

  return found;
}

export async function addReview(movieName, reviewText) {
  await addDoc(collection(db, 'reviews'), {
    movieName: movieName,
    reviewText: reviewText,
    createdAt: new Date() 
  });
}

export async function getAllReviews() {
  const colRef = collection(db, 'reviews');
  try {
    const querySnapshot = await getDocs(query(colRef, orderBy('createdAt', 'desc')));
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error.message);
    return [];
  }
}

export async function deleteReview(reviewId) {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    return false;
  }
}
