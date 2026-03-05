"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/recipes/:id/increment-view",
      handler: "recipe.incrementView",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/recipes/:id/favorite",
      handler: "recipe.favorite",
      config: {
        auth: false,
      },
    },
  ],
};
