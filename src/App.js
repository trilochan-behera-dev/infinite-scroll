import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Filter from "./components/Filter";
import useDebounce from "./hooks/useDebounce";
import useThrottle from "./hooks/useThrottle";
import JobCard from "./components/JobCard";
import InfiniteScroll from "./components/InfiniteScroll";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(10),
    fontStyle: "italic",
    fontWeight: 900,
    color: "#00a57e",
    fontSize: "30px",
    textDecoration: "underline",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  noJobsMessage: {
    marginTop: theme.spacing(10),
    fontStyle: "italic",
    color: "#666",
  },
}));

function App() {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    remote: [],
    techStack: [],
    jobRole: [],
    minJdSalary: "",
  });

  // Debounce the filter criteria to reduce API calls
  const debouncedFilters = useDebounce(filters, 600);
  // Throttle the offset to avoid excessive loading
  const throttledOffset = useThrottle(offset, 1000);

  // Fetch job listings from API
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    limit: 12,
    offset: throttledOffset,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
          // Initialize filtered jobs with all jobs
          setFilteredJobs((prevJobs) => [...prevJobs, ...result.jdList]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error fetching job listings:", error);
      setLoading(false);
    }
  };

  // Fetch initial job listings on component mount
  useEffect(() => {
    fetchJobs();
  }, [throttledOffset]);

  // Update filtered jobs when filters change
  useEffect(() => {
    filterJobs(debouncedFilters);
  }, [debouncedFilters]);

  // Load more jobs when scrolling
  const loadMoreJobs = () => {
    if (!loading) {
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  // Filter job listings based on filter
  const filterJobs = (filters) => {
    // Apply filters to the original jobs list
    let filteredList = jobs.filter((job) => {
      // Filter by min experience
      if (filters.minExp && job.minExp < filters.minExp) {
        return false;
      }
      // Filter by company name
      if (
        filters.companyName &&
        !job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      ) {
        return false;
      }
      // Filter by location
      if (filters.remote.length > 0) {
        if (
          filters.remote.includes("remote") &&
          filters.remote.includes("on-site")
        ) {
          return true;
        } else if (filters.remote.includes("remote")) {
          if (!job.location.toLowerCase().includes("remote")) {
            return false;
          }
        } else if (filters.remote.includes("on-site")) {
          if (job.location.toLowerCase().includes("remote")) {
            return false;
          }
        }
      }
      // Filter by tech stack
      if (
        filters.techStack.length > 0 &&
        !filters.techStack.includes(job.techStack)
      ) {
        return false;
      }
      // Filter by job role
      if (
        filters.jobRole.length > 0 &&
        !filters.jobRole.includes(job.jobRole)
      ) {
        return false;
      }
      // Filter by min JD salary
      if (filters.minJdSalary && job.minJdSalary < filters.minJdSalary) {
        return false;
      }
      // Job passes all filter conditions
      return true;
    });

    // Update the filtered jobs state
    setFilteredJobs(filteredList);
  };

  return (
    <div className="App">
      <Typography variant="h6" align="center" className={classes.heading}>
        Find Your Jobs
      </Typography>
      <Container maxWidth="lg" className={classes.container}>
        {/* Filter component to apply filter criteria */}
        <Filter setFilters={setFilters} />
        {/* Display message if no jobs found */}
        {!filteredJobs.length && !loading && (
          <Typography
            variant="h6"
            align="center"
            className={classes.noJobsMessage}
          >
            No jobs found matching the selected criteria.
            <br />
            Please try different filters.
          </Typography>
        )}

        {/* Job List */}
        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {/* Job card component */}
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {loading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      <InfiniteScroll onScroll={loadMoreJobs} />
    </div>
  );
}

export default App;
