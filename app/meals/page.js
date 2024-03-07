import Link from "next/link";
import { Suspense } from "react"; //* Suspense is a component provided by react that allows you to handle loading states and show a fallback content until some data or resource has been loaded, so if you have a component performing fetching logic and returning a promise it will trigers Suspense to show the fallback until there done, Note: NextJs uses loading.js to wrap the component with Suspense behind the scenes and uses its content as a fallback

import MealsGrid from "@/components/meals/meals-grid";

import classes from "./page.module.css";

import getMeals from "@/lib/meals";

/* Converting NextJS component functions to asyncronous functions by adding async keywork is allowed, and this is normally not allowed for React component functions */
async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
