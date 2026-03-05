export default {
  async afterCreate(event) {
    await updateRecipeStats(event.result);
  },

  async afterUpdate(event) {
    const { result, params } = event;

    // Only recalc if status or rating changed
    if (!params.data.statu && !params.data.rating) return;

    await updateRecipeStats(result);
  },

  async afterDelete(event) {
    await updateRecipeStats(event.result);
  },
};

/**
 * 🔥 Central function to recalculate recipe stats
 * This guarantees data is ALWAYS correct.
 */
async function updateRecipeStats(review) {
  const recipeId = review.recipe?.id || review.recipe;

  if (!recipeId) return;

  // Fetch ALL approved reviews of this recipe
  const approvedReviews = await strapi.entityService.findMany(
    "api::review.review",
    {
      filters: {
        recipe: recipeId,
        statu: "APPROVED",
      },
      fields: ["rating"],
    },
  );

  const reviewCount = approvedReviews.length;

  const ratingCount = approvedReviews.filter((r) => r.rating !== null).length;

  const totalRating = approvedReviews.reduce(
    (sum, r) => sum + (r.rating || 0),
    0,
  );

  const avgRating = ratingCount === 0 ? 0 : totalRating / ratingCount;

  // Update recipe (single source of truth)
  await strapi.entityService.update("api::recipe.recipe", recipeId, {
    data: {
      reviewCount,
      ratingCount,
      avgRating: Number(avgRating.toFixed(1)),
    },
  });
}
