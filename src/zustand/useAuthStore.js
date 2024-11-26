import { create } from "zustand";
import { loginApi } from "../api/auth";
import { persist } from "zustand/middleware";

const authStore = persist(
  (set) => ({
    isLogin: !!localStorage.getItem("accessToken"), // 로그인 상태
    user: localStorage.getItem("auth")?.state?.user ?? null, // 사용자 정보 초기 상태
    login: async ({ id, password }) => {
      const userData = await loginApi({ id, password });
      localStorage.setItem("accessToken", userData.accessToken); // 토큰 저장
      set(() => ({
        isLogin: true,
        user: {
          id: userData.userId,
          nickname: userData.nickname,
          avatar: userData.avatar,
        },
      }));
    },
    logout: () => {
      set(() => ({
        isLogin: false,
        user: null,
      }));
      localStorage.clear();
    },
    changeProfile: (updatedData) => {
      set((state) => ({
        user: {
          ...state.user,
          ...updatedData, // 기존 사용자 정보에 업데이트된 데이터 병합
        },
      }));
    },
  }),
  { name: "auth" },
);

const useAuthStore = create(authStore);
export default useAuthStore;
