import useAuthStore from "../zustand/useAuthStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <h1>유저 프로필</h1>
      <p>닉네임: {user.nickname}</p>
    </>
  );
}
