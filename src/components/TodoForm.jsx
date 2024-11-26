import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { jsonApi } from "../api/axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm() {
  const [formData, setFormData] = useState({ title: "", contents: "" });

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (newTodo) => jsonApi.post(`/todos`, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setFormData({ title: "", contents: "" });
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title && !formData.contents) {
      alert("내용이나 제목을 입력해주세요.");
    }
    const newTodo = {
      id: uuidv4(),
      title: formData.title,
      contents: formData.contents,
      isDone: false,
      createdAt: Date.now(),
    };
    addMutation.mutate(newTodo);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>제목: </label>

      <input
        name="title"
        type="text"
        value={formData.title}
        onChange={onChange}
      />
      <label>내용: </label>
      <input
        name="contents"
        type="text"
        value={formData.contents}
        onChange={onChange}
      />
      <button type={"submit"}>추가</button>
    </form>
  );
}
