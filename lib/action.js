"use server";

import { redirect } from "next/navigation";

const { saveMeal } = require("./meals");

//* This server action function must be async function, and add it as a value of an 'action' attirbute of for example <form> tag.
//* note: normally in vanella JavaScript action attribute of a <form> tag must assigned to a path to which the request should be send
export async function shareMeal(formData) {
  // 'use server'; //* this directive inside a function create a so call 'server action' which is a function that guranted to excute on the server and only there, and it exists in react also

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal)

  redirect('/meals')
}
