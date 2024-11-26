import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jsonApi } from "../api/axios.js";

export default function TodoItem({ todo }) {
  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      const { data: todo } = await jsonApi.get(`/todos/${id}`);
      await jsonApi.patch(`/todos/${id}`, {
        isDone: !todo.isDone,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await jsonApi.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid black",
        width: "500px",
        height: "150px",
      }}
    >
      <section>
        <p>제목: {todo.title}</p>
        <p>내용: {todo.contents}</p>
      </section>
      <section>
        <button onClick={() => toggleMutation.mutate(todo.id)}>
          {todo.isDone ? "취소" : "완료"}
        </button>
        <button onClick={() => removeMutation.mutate(todo.id)}>삭제</button>
      </section>
    </li>
  );
}
