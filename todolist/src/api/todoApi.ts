// src/api/todoApi.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function getTodosByUserId(userId: number) {
  const res = await fetch(`${API_URL}/todos/user/${userId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch todos");
  }

  const data = await res.json();
  return data; // mảng todo
}
// ✅ todoApi.ts
export async function createTodo({
  title,
  description,
  user_id,
}: {
  title: string;
  description: string;
  user_id: number;
}) {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, user_id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Create failed");
  return data;
}


export async function toggleTodoStatus(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to toggle todo");
  }

  const data = await res.json();
  return data; 
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete todo");
  }

  return true; 
}

