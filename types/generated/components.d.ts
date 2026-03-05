import type { Schema, Struct } from '@strapi/strapi';

export interface RecipeIngredients extends Struct.ComponentSchema {
  collectionName: 'components_recipe_ingredients';
  info: {
    displayName: 'Ingredients';
  };
  attributes: {
    IngredientImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Name: Schema.Attribute.String;
    Note: Schema.Attribute.String;
    Quantity: Schema.Attribute.Decimal;
    Unit: Schema.Attribute.String;
  };
}

export interface RecipeNutrition extends Struct.ComponentSchema {
  collectionName: 'components_recipe_nutritions';
  info: {
    displayName: 'Nutrition';
  };
  attributes: {
    calcium: Schema.Attribute.Integer;
    calories: Schema.Attribute.Decimal;
    carbohydrates: Schema.Attribute.Integer;
    cholesterol: Schema.Attribute.Integer;
    fiber: Schema.Attribute.Integer;
    iron: Schema.Attribute.Integer;
    nutritionSubtitle: Schema.Attribute.Text;
    protein: Schema.Attribute.Integer;
    saturatedFat: Schema.Attribute.Integer;
    sodium: Schema.Attribute.Integer;
    source: Schema.Attribute.String;
    sugars: Schema.Attribute.Integer;
    totalFat: Schema.Attribute.Integer;
    vitaminA: Schema.Attribute.Integer;
    vitaminC: Schema.Attribute.Integer;
  };
}

export interface RecipeQuestionsAnswer extends Struct.ComponentSchema {
  collectionName: 'components_recipe_questions_answers';
  info: {
    displayName: 'QuestionsAnswer';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.String;
  };
}

export interface RecipeSteps extends Struct.ComponentSchema {
  collectionName: 'components_recipe_steps';
  info: {
    displayName: 'Steps';
  };
  attributes: {
    instruction: Schema.Attribute.RichText;
    stepNumber: Schema.Attribute.Integer;
    StepsImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'recipe.ingredients': RecipeIngredients;
      'recipe.nutrition': RecipeNutrition;
      'recipe.questions-answer': RecipeQuestionsAnswer;
      'recipe.steps': RecipeSteps;
    }
  }
}
