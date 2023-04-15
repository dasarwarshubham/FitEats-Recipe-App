import axios from "axios";

const API_URL = "https://api.edamam.com/api/recipes/v2";

export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        type: "public",
        app_id: process.env.REACT_APP_EDAMAM_API_ID,
        app_key: process.env.REACT_APP_EDAMAM_API_KEY,
        imageSize: "LARGE",
        random: "false",
      },
    });
    console.log(response);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      params: {
        type: "public",
        app_id: process.env.REACT_APP_EDAMAM_API_ID,
        app_key: process.env.REACT_APP_EDAMAM_API_KEY,
      },
    });
    const recipe = response.data.recipe;
    return recipe;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        type: "public",
        q: query,
        app_id: process.env.REACT_APP_EDAMAM_API_ID,
        app_key: process.env.REACT_APP_EDAMAM_API_KEY,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
};
