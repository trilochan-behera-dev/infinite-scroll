import { useEffect } from "react";
import PropTypes from "prop-types";

const InfiniteScroll = ({ onScroll }) => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      onScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);

  return null;
};

InfiniteScroll.propTypes = {
  onScroll: PropTypes.func.isRequired,
};

export default InfiniteScroll;
