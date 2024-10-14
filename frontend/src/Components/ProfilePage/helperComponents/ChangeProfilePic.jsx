import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { isAuth } from "../../../redux/reducers/auth/authSlice";
import expirationTime from "../../../../calculate/expirationTime";
import pictures from "../utils/profilePictures";

import BASE_URL from "../../../utils";

const ChangeProfilePic = ({ setChangePP }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handlePictureUpdate = async (pictureUrl) => {
    let user = JSON.parse(Cookies.get("weeebsuser"));
    user.profilepictureurl = pictureUrl;
    const userDetails = JSON.stringify(user);
    Cookies.set("weeebsuser", userDetails, {
      expires: expirationTime(),
      sameSite: "None",
      secure: true,
    });
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
    const formData = {
      userId: user._id,
      pictureUrl,
    };
    setChangePP(false);
    await fetch(`${BASE_URL}/users/changeprofilepicture`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        
        position: "absolute",
        top: "20%",
        zIndex: "3",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + theme.palette.primary.other,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Select New Profile Picture</Typography>
        <Close sx={{ cursor: "pointer" }} onClick={() => setChangePP(false)} />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", overflowY: "scroll", height: "40vh", }}>
        {pictures.map((picture, index) => (
          <Box
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => handlePictureUpdate(picture)}
          >
            <PictureBadge link={picture} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PictureBadge = (prop) => {
  return <Avatar alt="ss" src={prop.link} sx={{ width: 66, height: 66 }} />;
};
export default ChangeProfilePic;
