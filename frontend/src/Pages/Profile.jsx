import { Box, Divider, Stack } from "@mui/material";
import SideBar from "../Components/HomePage/SideBar";
import { isAuth } from "../redux/reducers/auth/authSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProfileDetails from "../Components/ProfilePage/ProfileDetails";
import ProfileLeftBar from "../Components/ProfilePage/ProfileLeftBar";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    window.scroll(0, 0)
    if (Cookies.get("weeebsuser")) {
      setUser(JSON.parse(Cookies.get("weeebsuser")));
    }
  }, []);
  if (user) {
    dispatch(
      isAuth({
        isAuthenticated: true,
        email: user.email,
        fullname: user.fullname,
        profilePictureUrl: user.profilepictureurl,
        theme: user.theme,
        username: user.username,
        postcount: user.postcount,
        followers: user.followers,
        following: user.following,
        location: user.location,
        bio: user.bio,
        animeInterest: user.animeInterest,
        verified: user.verified,
      })
    );
  }
  return (
    <Box bgcolor={"primary.main"} color={"primary.text"} minHeight="150vh">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 0, sm: 2 }}
      >
        <ProfileLeftBar />
        <ProfileDetails />
        <SideBar />
      </Stack>
    </Box>
  );
};

export default Profile;
