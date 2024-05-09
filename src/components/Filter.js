import React, { useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
  },
}));

const Filter = ({ setFilters }) => {
  const classes = useStyles();
  const [filters, setLocalFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    remote: [],
    techStack: [],
    jobRole: [],
    minJdSalary: "",
  });

  // Handle change for single value inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle change for multi-select inputs
  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        {/* Text field for company name */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search Company Name"
            name="companyName"
            value={filters.companyName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Text field for location */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Select input for remote/on-site */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="remote-label">Remote/On-site</InputLabel>
            <Select
              labelId="remote-label"
              id="remote"
              name="remote"
              multiple
              value={filters.remote}
              onChange={handleMultiSelectChange}
            >
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="on-site">On-site</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Select input for tech stack */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="tech-stack-label">Tech Stack</InputLabel>
            <Select
              labelId="tech-stack-label"
              id="tech-stack"
              name="techStack"
              multiple
              value={filters.techStack}
              onChange={handleMultiSelectChange}
            >
              {[
                "HTML/CSS",
                "JavaScript",
                "React",
                "Node.js",
                "Python",
                "Java",
                "Ruby",
                "PHP",
                "C#",
                "Swift",
              ].map((stack) => (
                <MenuItem key={stack} value={stack}>
                  {stack}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Select input for job role */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="jobRole"
              multiple
              value={filters.jobRole}
              onChange={handleMultiSelectChange}
            >
              {["frontend", "backend", "ios", "android", "tech lead"].map(
                (role) => (
                  <MenuItem key={role} value={role} className={classes.role}>
                    {role}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
        {/* Select input for minimum JD salary */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="min-salary-label">Min Base Pay</InputLabel>
            <Select
              labelId="min-salary-label"
              id="min-salary"
              name="minJdSalary"
              value={filters.minJdSalary}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Min Base Pay</em>
              </MenuItem>
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} USD
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Select input for minimum experience */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="min-exp-label">Min Experience</InputLabel>
            <Select
              labelId="min-exp-label"
              id="min-exp"
              name="minExp"
              value={filters.minExp}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Min Experience</em>
              </MenuItem>
              {[...Array(11).keys()].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filter;
