import { Form, Button, InputGroup, Spinner } from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../assets/search-recipe.svg";

function RecipeSearchForm({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
}) {
  return (
    <Form onSubmit={handleSearch} className="search-form">
      <InputGroup className="mb-3 search-form-input">
        <Form.Control
          type="text"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button variant="primary" type="submit">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            <SearchIcon style={{ height: "16px", width: "16px" }} />
          )}
        </Button>
      </InputGroup>
    </Form>
  );
}

export default RecipeSearchForm;
