import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { LoginWrapper } from "../Wrapper";
import useStyles from "./styles";
import RegistrationIcon from "../../assets/images/emailLock.png";
import { Avatar } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { phoneExist, updateUser } from "../../apollo/server";
import { gql, useMutation } from "@apollo/client";

import UserContext from "../../context/User";
import ConfigurationContext from "../../context/Configuration";

import { useTranslation } from "react-i18next";

const PHONE = gql`
  ${phoneExist}
`;

const UPDATEUSER = gql`
  ${updateUser}
`;

function PhoneNumber() {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  //const [setPhoneError] = useState("");

  const [mutate] = useMutation(UPDATEUSER);
  const { profile } = useContext(UserContext);
  const configuration = useContext(ConfigurationContext);

  const [PhoneEixst] = useMutation(PHONE, {
    onCompleted,
    onError,
  });

  async function onCompleted({ phoneExist }) {
    if (phoneExist?._id !== null) {
      setError("Phone number already assocaited with some other user");
      setLoading(false);
    } else {
      try {
        if (configuration?.twilioEnabled) {
          // Fetch twilioEnabled from state
          navigate("/verify-phone", {
            replace: true,
            state: {
              phone: `+${phone}`,
            },
          });
        } else {
          // If twilioEnabled is not true, mutate and navigate to "/"
          await mutate({
            variables: {
              name: profile.name,
              phone: `+${phone}`,
              phoneIsVerified: true,
            },
          });

          navigate("/", {
            replace: true,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  function onError({ error }) {
    setError("Something went wrong");
  }

  const handleAction = () => {
    setError("");
    let validate = true;
    if (!phone) {
      setError("Phone number required");
      validate = false;
      return;
    }
    if (validate) {
      if (`+${phone}` !== state?.prevPhone) {
        PhoneEixst({ variables: { phone: `+${phone}` } });
      } else {
        setError("New phone number must be different from pervious one");
      }
    }
  };

  return (
    <LoginWrapper>
      <FlashMessage
        open={Boolean(error)}
        severity={"error"}
        alertMessage={error}
      />
      <Box display="flex">
        <Box m="auto">
          <Avatar
            m="auto"
            alt="email"
            src={RegistrationIcon}
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              alignSelf: "center",
            }}
          />
        </Box>
      </Box>
      <Typography variant="h5" className={classes.font700}>
        {t("updatePhone")} <br /> {t("number")}
      </Typography>
      <Box mt={theme.spacing(1)} />
      <Typography
        variant="caption"
        className={`${classes.caption} ${classes.fontGrey}`}
      >
        {t("secureAcc")}
      </Typography>
      <Box mt={theme.spacing(4)} />
      <form ref={formRef}>
        <Box className={classes.form}>
          <PhoneInput
            placeholder="Enter phone number"
            country={"pk"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            containerStyle={{
              textAlign: "center",
              marginRight: theme.spacing(2),
              margin: "auto",
              width: "90%",
            }}
            inputStyle={{
              paddingLeft: 10,
              float: "right",
            }}
          />
        </Box>
        <Typography variant="caption" style={{ color: "red" }}>
          {t("mobileErr1")}
        </Typography>
        <Box mt={theme.spacing(8)} />
        <Button
          variant="contained"
          fullWidth
          type="email"
          disableElevation
          disabled={loading}
          className={classes.btnBase}
          onClick={(e) => {
            e.preventDefault();
            handleAction();
          }}
        >
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Typography
              variant="caption"
              className={`${classes.caption} ${classes.font700}`}
            >
              {t("continue")}
            </Typography>
          )}
        </Button>
      </form>
    </LoginWrapper>
  );
}

export default PhoneNumber;
