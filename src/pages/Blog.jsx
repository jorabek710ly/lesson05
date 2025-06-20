import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../api";
import "./blog.css";

const Blog = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    isMarried: "",
    Profession: "",
    img: ""
  });

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => api.get("/blog"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const postMutation = useMutation({
    mutationFn: (body) => api.post("/blog", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/blog/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formState,
      age: Number(formState.age),
      isMarried: formState.isMarried === "true" || formState.isMarried === true,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, body: payload });
      setEditingId(null);
    } else {
      postMutation.mutate(payload);
    }

    setFormState({
      name: "",
      age: "",
      isMarried: "",
      Profession: "",
      img: ""
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (person) => {
    setEditingId(person.id);
    setFormState({
      name: person.name,
      age: person.age,
      isMarried: person.isMarried,
      Profession: person.Profession,
      img: person.img
    });
  };

  return (
    <div className="blog-container">
      <h2>People Manager</h2>

      <form onSubmit={handleSubmit} className="blog-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formState.age}
          onChange={(e) => setFormState({ ...formState, age: e.target.value })}
          required
        />
        <select
          name="isMarried"
          value={formState.isMarried}
          onChange={(e) => setFormState({ ...formState, isMarried: e.target.value })}
          required
        >
          <option value="">Married?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <input
          name="Profession"
          type="text"
          placeholder="Profession"
          value={formState.Profession}
          onChange={(e) => setFormState({ ...formState, Profession: e.target.value })}
          required
        />
        <input
          name="img"
          type="url"
          placeholder="Image URL"
          value={formState.img}
          onChange={(e) => setFormState({ ...formState, img: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Married</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((person) => (
            <tr key={person.id}>
              <td>
                <img src={person.img} alt={person.name} className="blog-avatar" />
              </td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.isMarried ? "Yes" : "No"}</td>
              <td>{person.Profession}</td>
              <td className="actions">
                <button className="edit-btn" onClick={() => handleEdit(person)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blog;
