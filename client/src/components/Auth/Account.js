import React, { useState } from "react";
import { Typography, Tab, Tabs, Box, Grid } from "@material-ui/core";
import clsx from "clsx";
import { ReactComponent as Profile } from "../../theme/assets/profile-user.svg";
import { ReactComponent as Key } from "../../theme/assets/key.svg";
import MIcon from "../Utils/MIcon";
import Wrapper from "../General/Wrapper";
import useStyles from "../../theme/styles";
import ChangePhoto from "./ChangePhoto";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = ({ toggleTheme }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper {...{ toggleTheme }}>
      <div className={classes.p30}>
        <Typography
          variant="overline"
          gutterBottom
          className={clsx(classes.subtitle)}
        >
          Account
        </Typography>

        <div
          className={classes.tabRoot}
          data-aos="fade-up"
          data-aos-offset="500"
          data-aos-duration="500"
          data-aos-easing="ease-in-sine"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            //   textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            //   centered
          >
            <Tab
              label={
                <Typography
                  variant="overline"
                  className={clsx(classes.small, classes.grid)}
                >
                  <MIcon
                    src={Profile}
                    viewBox="0 0 45.532 45.532"
                    className={classes.mr5}
                  />
                  General
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography
                  variant="overline"
                  className={clsx(classes.small, classes.grid)}
                >
                  <MIcon src={Key} className={classes.mr5} />
                  Change Password
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={3} justify="space-between">
              <Grid item md={4} xs={12}>
                <ChangePhoto />
              </Grid>
              <Grid item md={8} xs={12}>
                <UpdateProfile />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UpdatePassword />
          </TabPanel>
        </div>
      </div>
    </Wrapper>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={3} pb={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Account;
