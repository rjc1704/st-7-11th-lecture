import { useState } from "react";
import styled from "styled-components";
import useForm from "../hooks/useForm";
import { validateForm } from "../utils/validation";
import { registerApi } from "../api/auth";
import useAuthStore from "../zustand/useAuthStore";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { formStates, formErrors, onChangeHandler, resetForm } = useForm(
    {
      id: "",
      password: "",
      nickname: "",
    },
    validateForm,
  );
  const { id, password, nickname } = formStates;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        await login({ id, password });
        alert("로그인 성공");
      } catch (err) {
        alert(err?.response?.data?.message);
        console.error(err);
      }
    } else {
      // 회원가입 처리
      try {
        const data = await registerApi({
          id,
          password,
          nickname,
        });
        if (data.success) {
          setIsLoginMode(true);
          resetForm();
          alert("회원가입 성공");
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>{isLoginMode ? "로그인" : "회원가입"}</Title>
        <Input
          name="id"
          value={id}
          onChange={onChangeHandler}
          placeholder="아이디 (4~10글자)"
          minLength={4}
          maxLength={10}
        />
        {formErrors.id && <ErrorMessage>{formErrors.id}</ErrorMessage>}
        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          placeholder="비밀번호 (4~15글자)"
          minLength={4}
          maxLength={15}
        />
        {formErrors.password && (
          <ErrorMessage>{formErrors.password}</ErrorMessage>
        )}
        {!isLoginMode && (
          <>
            <Input
              name="nickname"
              value={nickname}
              onChange={onChangeHandler}
              placeholder="닉네임 (2~10글자)"
              minLength={2}
              maxLength={10}
            />
            {formErrors.nickname && (
              <ErrorMessage>{formErrors.nickname}</ErrorMessage>
            )}
          </>
        )}
        <button>{isLoginMode ? "로그인" : "회원가입"}</button>
        <ToggleText>
          <span onClick={() => setIsLoginMode((prev) => !prev)}>
            {isLoginMode ? "회원가입으로" : "로그인으로"}
          </span>
        </ToggleText>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  display: block;
  margin-bottom: 16px;
  padding: 12px 0;
  outline: none;
`;

const ToggleText = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 24px;
  & span {
    color: lightgray;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
