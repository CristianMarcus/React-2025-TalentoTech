
import React, { useState, useEffect } from 'react'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaArrowUp } from 'react-icons/fa'; 

const Layout = ({ children }) => {
  
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

 
  useEffect(() => {
    const handleScroll = () => {
     
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        
        setShowScrollToTop(false);
      }
    };

    
    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Header />
      
      <main className="flex-grow-1 container my-4 px-3 main-content-wrapper"> 
        {children}
      </main>
      <Footer />

      
      {showScrollToTop && (
        <button
          onClick={scrollToTop} 
          className="btn btn-primary rounded-circle shadow-lg" 
          aria-label="Volver arriba" 
          style={{ 
            position: 'fixed', 
            bottom: '90px',    
            right: '20px',     
            zIndex: 1050,      
            width: '55px',     
            height: '55px',    
            display: 'flex',   
            justifyContent: 'center', 
            alignItems: 'center',     
            border: 'none',    
            color: 'white',    
          }}
        >
          <FaArrowUp className="fs-4" /> 
        </button>
      )}
    </div>
  );
};

export default Layout;