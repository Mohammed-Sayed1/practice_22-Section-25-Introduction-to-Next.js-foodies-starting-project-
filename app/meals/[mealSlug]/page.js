import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

import Image from "next/image";
import classes from "./page.module.css";

//* this is how to define metadate for dynamic pages
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) notFound(); //* in case there is no meals with this path, it will show not found page instaed of showing error page because the return will be undefind

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) notFound(); //* provided bu NextJS: will stop this component from excution and show to the user the clothest not-found.js or error.js page

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
