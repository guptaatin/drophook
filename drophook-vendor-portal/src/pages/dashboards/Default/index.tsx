import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";
import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";
import Table from "./Table";
import { JoinVendorsService } from "../../../services/VendorService";

const Divider = styled(MuiDivider)(spacing);

const Typography: any = styled(MuiTypography)(spacing);

function Default() {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userid");
  const role = localStorage.getItem("role");
  const [data, setData] = useState<any>({});
  const userFirstName = localStorage.getItem("user_first_name");
  const userLastName = localStorage.getItem("user_last_name");
  useEffect(() => {
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const joinVendors = async () => {
        const json = await JoinVendorsService(userId);
        setData(json[0]);
      };
      joinVendors();
    }
  }, [role, userId]);

  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Default Dashboard
          </Typography>
          <Typography style={{ display: "flex" }} variant="subtitle1">
            {t("Welcome back")},&nbsp;
            {role === "ROLE_VENDOR ADMINISTRATOR" ? (
              <>
                {data.first_name !== undefined &&
                data.last_name !== undefined ? (
                  <div>
                    {data.first_name.charAt(0).toUpperCase() +
                      data.first_name.slice(1)}
                    &nbsp;
                    {data.last_name.charAt(0).toUpperCase() +
                      data.last_name.slice(1)}
                  </div>
                ) : null}
              </>
            ) : role === "ROLE_SUPER ADMINISTRATOR" ? (
              <div>Super Admin</div>
            ) : role === "ROLE_ADMINISTRATOR" ? (
              <div>Admin</div>
            ) : (
              <>
                {userFirstName !== null && userLastName !== null ? (
                  <div>
                    {userFirstName.charAt(0).toUpperCase() +
                      userFirstName.slice(1)}
                    &nbsp;
                    {userLastName.charAt(0).toUpperCase() +
                      userLastName.slice(1)}
                  </div>
                ) : null}
              </>
            )}
            ! {t("We've missed you")}.
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Sales Today"
            amount="2.532"
            chip="Today"
            percentagetext="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="170.212"
            chip="Annual"
            percentagetext="-14%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            chip="Monthly"
            percentagetext="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Pending Orders"
            amount="45"
            chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <BarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
