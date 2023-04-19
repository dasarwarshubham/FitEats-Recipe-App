import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  Button,
  Accordion,
  Table,
} from "react-bootstrap";

import { getRecipeById } from "../services/edamamApi";

const NutrientTable = ({ data }) => {
  return (
    <>
      <Accordion defaultActiveKey="2" flush alwaysOpen>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Nutrient Guide</Accordion.Header>
          <Accordion.Body>
            <Table responsive hover={true}>
              <tbody>
                {Object.keys(data).map((item, index) => (
                  <tr key={`nutrient-${index}`}>
                    <td>{data[item].label}</td>
                    <td className="text-end">
                      {Number.parseFloat(data[item].total).toFixed(3)}&nbsp;
                      {data[item].unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id)
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    document.title = recipe ? `${recipe?.label} - Fit Eats` : "Loading...";
  }, [recipe]);

  return (
    <Container>
      {recipe && (
        <>
          <Helmet>
            <meta
              name="description"
              content="Find healthy and delicious recipes on FitEats. Explore a variety of dishes that are both nutritious and flavorful."
            />
            <meta
              name="keywords"
              content={`${recipe.label}, ${recipe.healthLabels.join(", ")}`}
            />
            <meta
              property="og:title"
              content={`${recipe.label} - Healthy Recipes - FitEats`}
            />
            <meta
              property="og:description"
              content="Find healthy and delicious recipes on FitEats. Explore a variety of dishes that are both nutritious and flavorful."
            />
            <meta property="og:image" content={recipe.image} />
            <meta
              property="og:url"
              content={`${process.env.REACT_APP_PUBLIC_URL}/recipe/c5b383d37a4185e44b1cf0d5748c5efe`}
            />
            <meta
              name="twitter:title"
              content={`${recipe.label} - Healthy Recipes - FitEats`}
            />
            <meta
              name="twitter:description"
              content="Find healthy and delicious recipes on FitEats. Explore a variety of dishes that are both nutritious and flavorful."
            />
            <meta name="twitter:image" content={recipe.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <title>{recipe.label} - Healthy Recipes - FitEats</title>
          </Helmet>
          <Row className="my-3">
            <Col xs={12} md={6} lg={5} className="mb-4">
              <Image
                className="img-fluid w-100"
                src={recipe.image}
                alt={recipe.label}
                fluid
              />
            </Col>
            <Col xs={12} md={6} lg={7} className="mb-4">
              <h3 className="fs-1">{recipe.label}</h3>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Calories</td>
                    <td>{Number.parseFloat(recipe.calories).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Cusine Type</td>
                    <td className="text-capitalize">
                      {recipe.cuisineType.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td>Dish Type</td>
                    <td className="text-capitalize">
                      {recipe.dishType.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td>Meal Type</td>
                    <td className="text-capitalize">
                      {recipe.mealType.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Health Labels</span>
                    </td>
                    <td>
                      {recipe.healthLabels.map((label, idx) => (
                        <Badge
                          bg="success"
                          key={`health-label-${idx}`}
                          className="me-2"
                        >
                          {label}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Cautions:</td>
                    <td className="text-capitalize">
                      {recipe.cautions.map((label, idx) => (
                        <Badge
                          bg="danger"
                          key={`health-label-${idx}`}
                          className="me-2"
                        >
                          {label}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} className="mb-4">
              <Accordion defaultActiveKey="0" flush alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Ingridents ({recipe.ingredientLines.length}):
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {recipe.ingredientLines.map((ingredient, index) => (
                        <li key={`recipe-${index}`}>{ingredient}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col xs={12} md={8} className="mb-4">
              <Accordion defaultActiveKey="1" flush alwaysOpen>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>For Preparation:</Accordion.Header>
                  <Accordion.Body>
                    <Button
                      size="sm"
                      as={Link}
                      to={recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col xs={12} md={8} className="mb-4">
              <NutrientTable data={recipe.digest} />
            </Col>
            <Col xs={12} className="mb-4">
              <span>
                Source:{" "}
                <a href={recipe.url} target="_blank" rel="noreferrer">
                  {recipe.url}
                </a>
              </span>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default RecipeDetails;
