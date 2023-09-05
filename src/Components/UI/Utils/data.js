import { addConnection, writeData } from "../../../firebase/firebase";
export const banner = [
  "https://cdn.pixabay.com/photo/2020/02/03/00/12/fiber-4814456_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/07/10/23/45/cubes-2492010_640.jpg",
  "https://cdn.pixabay.com/photo/2020/01/26/20/14/computer-4795762_640.jpg",
  "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg",
  "https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_640.jpg",
  "https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_640.jpg",
  "https://cdn.pixabay.com/photo/2018/01/23/11/28/water-3101241_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png",
  "https://cdn.pixabay.com/photo/2016/11/19/22/52/coding-1841550_640.jpg",
];
export const dp = [
  "data:image/jpeg;base64,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",
  "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/24/09/10/man-1276384_640.jpg",
  "https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100_640.jpg",
  "https://cdn.pixabay.com/photo/2016/08/01/20/15/girl-1562025_640.jpg",
  "https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_640.jpg",
  "https://cdn.pixabay.com/photo/2017/12/31/15/56/portrait-3052641_640.jpg",
  "https://cdn.pixabay.com/photo/2017/02/06/10/54/sad-2042536_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_640.jpg",
  "https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_640.jpg",
  "https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/18/15/03/man-1835195_640.jpg",

  "https://cdn.pixabay.com/photo/2015/01/12/10/45/man-597178_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/03/15/man-1867009_640.jpg",
];

export const images = [
  "https://cdn.pixabay.com/photo/2023/07/31/13/02/car-8160965_640.jpg",
  "https://cdn.pixabay.com/photo/2019/09/12/13/29/sunset-4471603_640.jpg",
  "https://cdn.pixabay.com/photo/2018/07/07/11/30/success-3521937_640.jpg",
  "https://cdn.pixabay.com/photo/2019/11/29/14/38/boxing-4661441_640.jpg",
  "https://cdn.pixabay.com/photo/2019/09/14/10/42/sunset-4475695_640.jpg",
  "https://cdn.pixabay.com/photo/2017/01/27/16/09/girl-2013447_640.jpg",
];
export const GET_READABLE_TIME = (timestamp) => {
  // const now = new Date(Date.now());
  const currentTimestamp = Date.now();
  const date = new Date(currentTimestamp - timestamp * 1);
  //   console.log("timestampDate : ", date);
  const year = date.getFullYear() - 1970;
  const month = date.getMonth();
  const day = date.getDate() - 1;
  const hour = date.getHours() - 5;
  const munite = date.getMinutes() - 30;
  const second = date.getSeconds();

  // console.log(year, month, day, hour, munite,second);

  // console.log(datevalues);
  const time =
    year > 0
      ? `${year} ${year > 1 ? "yeays" : "year"}`
      : month > 0
      ? `${month} ${month > 1 ? "months" : "month"}`
      : day > 0
      ? `${day} ${day > 1 ? "days" : "day"}`
      : hour > 0
      ? `${hour} ${hour > 1 ? "hours" : "hour"}`
      : munite > 0
      ? `${munite} ${munite > 1 ? "munites" : "munite"}`
      : second
      ? `${second} ${second > 1 ? "seconds" : "second"}`
      : "1 second";

  return time;
};
export const isAConnection = ({ myConnectionList, uid }) => {
  const isFound = myConnectionList.find((e) => e.uid === uid);
  // console.log(uid, "----> ", isFound);
  return isFound;
};

export const SendRequest = ({ sender, receiver }) => {
  // console.log(sender);
  const timestamp = Date.now();
  const senderData = {
    requestId: timestamp,
    status: "pending",
    uid: sender.uid,
    name: sender.name,
    pic: sender.pic,
    bio: sender.bio,
  };
  const receiverData = {
    requestId: timestamp,
    status: "pending",
    uid: receiver.uid,
    bio: receiver.bio,
    pic: receiver.pic,
    name: receiver.name,
  };
  // ------------write data for connection requests------------
  writeData({
    key: `getRequest/${receiver.uid}`,
    id: sender.uid,
    payload: senderData,
  });
  writeData({
    key: `postRequest/${sender.uid}`,
    id: receiver.uid,
    payload: receiverData,
  });

  // -----------------write data for notifications----------------
  const status = `sent you a connection request. View ${sender.name}'s profile`;
  SEND_NOTIFICATION({
    sender,
    receiverId: receiver.uid,
    status,
    content: null,
  });
};

export const SEND_NOTIFICATION = ({ sender, receiverId, status, content }) => {
  if (sender.uid === receiverId) return;
  const timestamp = Date.now();
  const payload = {
    notificationId: timestamp,
    timestamp,
    uid: sender.uid,
    name: sender.name,
    pic: sender.pic,
    bio: sender.bio,
    read: false,
    status,
    content,
  };
  writeData({
    key: `notifications/${receiverId}`,
    id: timestamp,
    payload: payload,
  });
};
export const ADD_CONNECTION = async ({ sender, receiverId, setConnection }) => {
  await addConnection({
    uid: receiverId,
    senderId: sender.uid,
    senderInfo: {
      uid: sender.uid,
      name: sender.name,
      pic: sender.pic,
      bio: sender.bio,
    },
    setConnection,
  });
};
export const ADD_TO_CONNECTION_LIST = ({ myid, user }) => {
  writeData({
    key: `connections/${myid}`,
    id: user.uid,
    payload: {
      uid: user.uid,
      name: user.name,
      pic: user.pic,
      bio: user.bio,
    },
  });
};
export const REMOVE_REQUEST = ({ key, id }) => {
  writeData({
    key,
    id,
    payload: null,
  });
};

export const SearchUser = async ({ allUsers = [], searchKey = "" }) => {
  const len = searchKey.length;
  const result = allUsers.filter(
    (user) =>
      user.name.substring(0, len).toLowerCase() === searchKey.toLowerCase()
  );
  return result;
};
