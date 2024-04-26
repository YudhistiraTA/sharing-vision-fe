import axios from "axios";

export default async function deleteArticle(id: number) {
  return axios.delete(import.meta.env.VITE_API_URL + `/articles/${id}`);
}