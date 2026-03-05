"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::recipe.recipe", ({ strapi }) => ({
  async incrementView(ctx) {
    const { id } = ctx.params;

    const recipe = await strapi.entityService.findOne(
      "api::recipe.recipe",
      id,
      { publicationState: "preview" }, // IMPORTANT
    );

    if (!recipe) {
      return ctx.notFound("Recipe not found");
    }

    const updated = await strapi.entityService.update(
      "api::recipe.recipe",
      id,
      {
        data: {
          viewsCount: (recipe.viewsCount || 0) + 1,
        },
        publicationState: "preview",
      },
    );

    ctx.send({ viewsCount: updated.viewsCount });
  },

  async favorite(ctx) {
    const { id } = ctx.params;

    const recipe = await strapi.entityService.findOne("api::recipe.recipe", id);

    if (!recipe) {
      return ctx.notFound("Recipe not found");
    }

    const updatedRecipe = await strapi.entityService.update(
      "api::recipe.recipe",
      id,
      {
        data: {
          favouritesCount: (recipe.favouritesCount || 0) + 1,
        },
      },
    );

    ctx.send({
      favouritesCount: updatedRecipe.favouritesCount,
    });
  },
}));
