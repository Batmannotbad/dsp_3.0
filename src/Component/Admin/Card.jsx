import { alpha, Box, Card, styled } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SaaSCard = ({ card }) => {
  const { Icon, title, price, color } = card;

  const StyledCard = styled(Card)(({ theme }) => ({
    padding: "0rem 4rem",
    display: "flex",
    alignItems: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
      flexDirection: "column",
      justifyContent: "center",
      "& .MuiBox-root": {
        marginRight: 0,
        textAlign: "center",
      },
    },
  }));

  return (
    <StyledCard>
      <Box
        sx={{
          width: 60,
          height: 60,
          marginRight: 10,
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: {color},
        }}
      >
         <FontAwesomeIcon style={{height:"50px"}} icon={Icon}/>
      </Box>
      <div className="d-flex flex-column gap-3 align-items-center my-4">
        <h2  className="card-title">{title}</h2>
        <h2 className="card-price">{price}</h2>
      </div>
    </StyledCard>
  );
};

export default SaaSCard;
