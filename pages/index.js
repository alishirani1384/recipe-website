import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";


export default function Home({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        const { fields, sys } = recipe;
        return (
          <RecipeCard
            key={sys.id}
            title={fields.title}
            thumbnail={fields.thumbnail}
            slug={fields.slug}
            cookingTime={fields.cookingTime}
          />
        );
      })}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESSTOKEN,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: res.items,
    },
  };
}
