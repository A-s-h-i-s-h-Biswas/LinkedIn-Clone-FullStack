import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "./config";
import { set, ref as dbRef, onValue, runTransaction  } from "firebase/database";

export const Authenticate = async ({ signin, email, password }) => {
  // const auth = getAuth(app);
  const GETAUTH = signin
    ? signInWithEmailAndPassword
    : createUserWithEmailAndPassword;
  const result = GETAUTH(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("token", user.accessToken);
      return user;
    })
    .catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  return result;
};

export const UploadFile = async ({ file, id, setUrlHandler }) => {
  // const [ulr,setUlr]=useState(null);
  // const storage = getStorage(app);
  // Create the file metadata
  // /** @type {any} */
  // const metadata = {
  //   contentType: "image/jpeg",
  // };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `${id}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);

        setUrlHandler(downloadURL);
      });
    }
  );
};

export const writeData = ({ key, id, payload }) => {
  const DBRef=dbRef(db, `${key}/${id}`);
  if(!DBRef)return;
  set(DBRef, payload);
};

export const getData = async ({ key, id, setDataHandler }) => {
  if (!key) return;
  const Ref = dbRef(db, `${key}/${id}`);
  onValue(
    Ref,
    (snapshot) => {
      if(!snapshot){
        setDataHandler(null);
        return;
      }
      const data = snapshot.val();
      setDataHandler(data);
    }
  );
};

export const getAllData = async ({ key, setDataHandler }) => {
  if (!key) return;
  const Ref = dbRef(db, `${key}`);
  onValue(
    Ref,
    (snapshot) => {
      if(!snapshot){
        setDataHandler([]);
        return;
      }
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // console.log(childKey);
        // console.log(childData);
        for (const value of Object.values(childData)) {
          dataArray.push(value);
        }
      });
      setDataHandler(dataArray);
    }
  );
};
export const getAllChildData = async ({ key, setDataHandler }) => {
  if (!key) return;
  const Ref = dbRef(db, `${key}`);
  onValue(
    Ref,
    (snapshot) => {
      if(!snapshot){
        setDataHandler([]);
        return;
      }
     
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        dataArray.push(childData);
      });
      setDataHandler(dataArray);
    }
  );
};

export const toggleReaction=async({uid, key, value, setReactionHandler})=> {
  const postRef = dbRef(db, `posts/${key}`);
  
   const res=runTransaction(postRef, (post) => {

    if (post) {
      if (post.reactions && post.reactions[uid]) {
        if(post.reactions[uid].text === value.text){
          post.reactionCount--;
          post.reactions[uid] = null;
          setReactionHandler({count:post.reactionCount, value:null});
        }
        else{
          post.reactions[uid] = value;
          setReactionHandler({count:post.reactionCount, value});
        }
      } else {
        post.reactionCount++;
        if (!post.reactions) {
          post.reactions = {};
        }
        post.reactions[uid] = value;
        setReactionHandler({count:post.reactionCount,value})
      }
    }
    // console.log(post);
   
    return post;
  });
  return res;
}

export const addComment=async({uid, key, value, setCommentHandler})=> {
  const postRef = dbRef(db, `posts/${key}`);
  
   const res=runTransaction(postRef, (post) => {

    if (post) {
      if (!post.comments) {
        post.comments = {};
      }
      post.commentCount++;
      post.comments[value.timestamp] = value;
      // if (post.comments[uid]) {
      // }
      // console.log(post);
      setCommentHandler({count:post.commentCount, value:post.comments});
    }
    return post;
  });
  return res;
}

export const addRepost=async({uid, key, setRepostHandler})=> {
  const postRef = dbRef(db, `posts/${key}`);
  
   const res=runTransaction(postRef, (post) => {

    if (post) {
      if (!post.reposts) {
        post.reposts = {};
      }
      post.repostCount++;
      post.reposts[uid] = true;
      // console.log(post);
      setRepostHandler(post.repostCount);
    }
    return post;
  });
  return res;
}

export const addConnection=async({uid, senderId, senderInfo, setConnection})=> {
  const postRef = dbRef(db, `users/${uid}`);
  
   const res=runTransaction(postRef, (user) => {

    if (user) {
      if (!user.connectionList) {
        user.connectionList = {};
      }
      user.connections++;
      user.followers++;
      user.connectionList[senderId] = senderInfo;
      if(setConnection){
        setConnection({connections:user.connections, followers:user.followers, connectionList:user.connectionList});
      }
    }
    return user;
  });
  return res;
}

export const addFollowers=async(uid)=> {
  const postRef = dbRef(db, `users/${uid}`);
   const res=runTransaction(postRef, (user) => {
    if (user) {
      user.followers++;
    }
    return user;
  });
  return res;
}
export const addFollowing=async(uid)=> {
  const postRef = dbRef(db, `users/${uid}`);
   const res=runTransaction(postRef, (user) => {
    if (user) {
      user.following++;
    }
    return user;
  });
  return res;
}
