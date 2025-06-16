const API_URL = "http://localhost:8000";

export async function getConnaissances(categorie_id?: number) {
  let url = `${API_URL}/connaissances.php`;
  if (categorie_id) url += `?categorie_id=${categorie_id}`;
  const res = await fetch(url);
  return res.json();
}

export async function addConnaissance(data: any) {
  const res = await fetch(`${API_URL}/connaissances.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateConnaissance(data: any) {
  const res = await fetch(`${API_URL}/connaissances.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteConnaissance(id: number) {
  const res = await fetch(`${API_URL}/connaissances.php?id=${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories.php`);
  return res.json();
}

export async function addCategory(data: any) {
  const res = await fetch(`${API_URL}/categories.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCategory(data: any) {
  const res = await fetch(`${API_URL}/categories.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${API_URL}/categories.php?id=${id}`, {
    method: "DELETE"
  });
  return res.json();
}