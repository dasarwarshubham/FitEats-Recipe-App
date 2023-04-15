import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import RecipeCard from "../components/RecipeCard";

const RecipesList = ({ data, loading }) => {
  if (loading) {
    return (
      <Spinner animation="border" role="status" className="mt-5">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner>
    );
  } else {
    return (
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {data.map((recipe, idx) => (
          <Col key={`recipe_${idx}`}>
            <RecipeCard recipe={recipe.recipe} />
          </Col>
        ))}
      </Row>
    );
  }
};

export default RecipesList;
