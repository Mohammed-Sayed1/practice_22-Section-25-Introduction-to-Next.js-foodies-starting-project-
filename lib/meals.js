import fs from 'node:fs'; //* this allow us to work with the file system

import sql from "better-sqlite3";
import slugify from 'slugify'
import xss from 'xss'

const db = sql("meals.db");

//* This function doesn't return a promise without using async keyword
export default async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); //* this line just for semulating a delay so we can add loading logic

  // throw new Error("Loading meals failed") //* to semulate server errors

  return db.prepare("SELECT * FROM meals").all();
}


export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); //* and we didn't do it like this => return db.prepare('SELECT * FROM meals WHERE slug = ' + slug) : because this may lead to a sql injection attack
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {lower: true})
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}_${Math.random()}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), error => {
    if(error) throw new Error('Saving image failed!')
  })

  meal.image = `/images/${fileName}`

  db.prepare(`
  INSERT INTO meals
    (slug, title, image, summary, instructions, creator, creator_email)
  VALUES
    (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
  `).run(meal)
}