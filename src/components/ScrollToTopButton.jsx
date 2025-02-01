import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if the page is scrolled and show the button
  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Show the button if the page is scrolled down
    } else {
      setIsVisible(false); // Hide the button if at the top of the page
    }
  };

  // Scroll the page to the top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add event listener on scroll to check scroll position
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    // Cleanup event listener
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <>
      {isVisible && (
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          ▲
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
