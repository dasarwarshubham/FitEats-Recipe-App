import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import RecipeSearchForm from "../containers/SearchForm";
import RecipesList from "../containers/RecipesList";

import { getRecipes, searchRecipes } from "../services/edamamApi";

import { ReactComponent as CookingIcon } from "../assets/hero-illustration.svg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await searchRecipes(searchTerm);
      setRecipes(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const data = await getRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Container className="my-5 py-5">
        <Row>
          <Col>
            <CookingIcon
              className="cooking-icon"
              style={{ maxHeight: "250px", width: "100%" }}
            />
            <h1 className="text-center">Welcome to the Recipe App!</h1>
            <p className="text-center">
              Search for your favorite recipes and start cooking!
            </p>
            <RecipeSearchForm
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
              handleSearch={handleSearchSubmit}
              loading={loading}
            />
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <h2 className="mb-4">
              {searchTerm ? "Search Results" : "Featured Recipes"}
            </h2>
            <RecipesList data={recipes} loading={loading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
