
export async function fetchProjects() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (!response.ok) {
    throw new Error('Error al cargar proyectos');
  }

  const data = await response.json();
  return data.slice(0, 5);
}