'use client' //* error.js component(file) must be a client component so you can catch any errors including errors that happen on the client side

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
