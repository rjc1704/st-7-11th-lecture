import { useQuery } from "@tanstack/react-query";
import { jsonApi } from "../api/axios";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import useAuthStore from "../zustand/useAuthStore";
import { Link } from "react-router-dom";

export default function Main() {
  const logout = useAuthStore((state) => state.logout);

  const { data: todos, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await jsonApi.get(`/todos`);
      return data;
    },
  });

  if (isPending) return <h2>로딩중...</h2>;

  return (
    <>
      <h1>회원제 투두리스트</h1>
      <div>
        <Link to="/profile">내 프로필</Link>
      </div>
      <button onClick={() => logout()}>로그아웃</button>
      <TodoForm />
      <TodoList isDone={false} todos={todos} />
      <TodoList isDone={true} todos={todos} />
    </>
  );
}
