import { useRef } from "react";
// import EastIcon from '@mui/icons-material/East';
// import WestIcon from '@mui/icons-material/West'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const CustomCarousal = ({ children }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", margin: "auto", paddingLeft: '25px', paddingRight: '25px' }}>
      {/* Left */}
      <button 
        onClick={scrollLeft} 
        style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
      >
        <ArrowCircleLeftIcon/>
      </button>

      {/* Container */}
      <div 
        ref={carouselRef} 
        style={{ 
          display: "flex", 
          overflowX: "auto", 
          scrollSnapType: "x mandatory", 
          gap: "25px", 
          padding: "10px",
          scrollbarWidth: "none",
          scrollBehavior: "smooth"
        }}
      >
        {children}
      </div>

      {/* Right */}
      <button 
        onClick={scrollRight} 
        style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
      >
        <ArrowCircleRightIcon/>
      </button>
    </div>
  );
};

export default CustomCarousal;
