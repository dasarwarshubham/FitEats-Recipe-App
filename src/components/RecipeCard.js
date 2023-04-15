import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Card
      as={Link}
      to={`/recipe/${recipe?.uri.split("#recipe_")[1]}`}
      className="recipe-card"
    >
      <Card.Img
        className="recipe-card-image"
        variant="top"
        src={recipe?.image}
      />
      <Card.ImgOverlay className="recipe-card-overlay">
        <Card.Title className="recipe-card-title">{recipe?.label}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RecipeCard;
