// import { useEffect } from "react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const HomePage = lazy(() =>
  import(/* webpackChunkName: "homepage" */ "./pages/Home")
);

const RecipeDetailsPage = lazy(() =>
  import(/* webpackChunkName: "recipedetailspage" */ "./pages/RecipeDetails")
);

const renderLoader = () => {
  const loaderStyles = {
    width: "100%",
    minHeight: "65vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <div style={loaderStyles}>
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

function App() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://developer.edamam.com/attribution/badge.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
