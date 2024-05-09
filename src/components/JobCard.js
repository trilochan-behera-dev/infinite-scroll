import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
  Button,
  Avatar,
  Link,
} from "@material-ui/core";

const JobCard = ({ job }) => {
  const {
    companyName,
    jobRole,
    location,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    jobDetailsFromCompany,
    logoUrl,
    jdLink,
    minExp,
    maxExp,
  } = job;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  // Function to toggle expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      {/* Header section with company logo and details */}
      <div className={classes.header}>
        <Avatar alt={companyName} src={logoUrl} className={classes.avatar} />
        <div className={classes.titleContainer}>
          <Typography variant="h6" component="h2" className={classes.title}>
            {jobRole}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle}
          >
            {companyName} - {location}
          </Typography>
        </div>
      </div>
      {/* Job details and description */}
      <CardContent>
        <Typography
          variant="body1"
          className={classes.salary}
          style={{ color: "#3f51b5" }}
        >
          Estimated Salary:{" "}
          {minJdSalary || maxJdSalary
            ? `${minJdSalary ? minJdSalary : ""} ${
                minJdSalary && maxJdSalary ? "-" : ""
              } ${maxJdSalary || ""} ${salaryCurrencyCode}`
            : "Not specified"}
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Minimum Experience:</strong>{" "}
          {minExp || maxExp
            ? `${minExp ? minExp : ""} ${minExp && maxExp ? "-" : ""} ${
                maxExp || ""
              } years`
            : "Not specified"}
        </Typography>
        <Typography variant="body2">
          {expanded
            ? jobDetailsFromCompany
            : `${jobDetailsFromCompany.slice(0, 480)}...`}
          <Button color="primary" size="small" onClick={toggleExpanded}>
            {expanded ? "View Less" : "View More"}
          </Button>
        </Typography>
      </CardContent>
      {/* Action section with Apply Now button */}
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          href={jdLink}
          target="_blank"
          className={classes.applyButton}
        >
          Easy Apply
        </Button>
      </CardActions>
    </Card>
  );
};

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  subtitle: {
    fontStyle: "italic",
    textTransform: "capitalize",
  },
  salary: {
    color: "#3f51b5",
    marginBottom: theme.spacing(1),
  },
  applyButton: {
    backgroundColor: "#00a57e",
    width: "calc(100% - 16px)",
    margin: "8px",
    height: "40px",
    color: "#fff",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#334393",
    },
    "&:active": {
      backgroundColor: "#2a377d", 
    },
  },
}));

export default JobCard;
