import React, { useRef } from "react";
import supabase from "../Supabase/supabase";
export default function ChatList(props) {
  const data = [
    {
      id: 1,
      name: "Sachin Khatri",
      message: "Great service and excellent products!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jessica Smith",
      message: "Always a pleasure shopping here.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      message: "Fast shipping and top-notch quality.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      message: "Love the variety of products available.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Michael Lee",
      message: "Superb customer support!",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Sophie Wilson",
      message: "Impressive selection and quick delivery.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Daniel Brown",
      message: "Highly recommend YourStore to everyone.",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Olivia Miller",
      message: "Quality products at affordable prices.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 9,
      name: "Matthew Taylor",
      message: "Efficient service and user-friendly website.",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 10,
      name: "Isabella Garcia",
      message: "Always satisfied with my purchases.",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      id: 11,
      name: "Michael Lee",
      message: "Superb customer support!",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 12,
      name: "Sophie Wilson",
      message: "Impressive selection and quick delivery.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];

  const [users, setUsers] = React.useState(null);
  const [sessionUser, setSessionUser] = React.useState(null)
  React.useEffect(() => {
    getSessionedUser();
    fetchUsers();
  }, [props.user]);

  const getSessionedUser = async()=>{
    setSessionUser(await props.user)
  }
  const fetchUsers = async () => {
    try {
      let { data: users, error } = await supabase.from("users").select("*");
      if (error) {
        console.log("Could not fetch users: ", error.message);
      } else {
        // Fetch and update images for each user
        const usersWithImages = await Promise.all(
          users.map(async (user) => {
            const { data: image, error: imageError } = await supabase.storage
              .from("messenger")
              .download(user.profile_image);

            if (imageError) {
              console.error("Error fetching image:", imageError.message);
            } else {
              // Assuming the downloaded image is in data URL format, you can modify accordingly
              user.profile_image = URL.createObjectURL(image);
            }
            return user;
          })
        );

        setUsers(usersWithImages);
        console.log("Users with Images: ", usersWithImages);
      }
    } catch (error) {
      console.error("Error in fetchUsers:", error.message);
    }
  };

  // const chatListArray = chatList.map((chat) => {
  //   let fakeSender = data.map((item) => item.name);
  //   return (
  //     <div
  //       className="d-flex align-items-center p-2 chat--list--group"
  //       key={chat.id}
  //     >
  //       <img src={chat.image} alt="" className="rounded-circle me-2" />
  //       <div className="d-flex flex-column">
  //         <span>{chat.name}</span>
  //         <span className="text-truncate">
  //           {fakeSender[Math.floor(Math.random() * fakeSender.length)]}:{" "}
  //           {chat.message}
  //         </span>
  //       </div>
  //     </div>
  //   );
  // });
  let chatListArray;
  if (users && sessionUser) {
    chatListArray = users.filter(user => user.user_id !== sessionUser.userData.user_id)
    .map((chat) => {
      return (
        <div
          className="d-flex align-items-center p-2 chat--list--group"
          key={chat.id} 
        >
          <img src={chat.profile_image} alt="" className="rounded-circle me-2" />
          <div className="d-flex flex-column">
            <span>{chat.fullname}</span>
            {/* <span className="text-truncate">
              {fakeSender[Math.floor(Math.random() * fakeSender.length)]}:{" "}
              {chat.message}
            </span> */}
          </div>
        </div>
      );
    });
  }

  return <div className="chat--list">{chatListArray}</div>;
}
