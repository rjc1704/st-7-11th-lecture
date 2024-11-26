import { useState } from "react";

const useForm = (initialState = {}, validate) => {
  const [formStates, setFormStates] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (event) => {
    // input 속성으로 반드시 name 을 지정합니다.
    const { name, value } = event.target;
    setFormStates((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const error = validate(name, value);
      // setFormErrors((prev) => ({ ...prev, [name]: error }));
      setFormErrors((prev) => {
        const updatedErrors = { ...prev };

        if (value.length === 0) {
          // value가 비어 있는 경우 해당 name 속성 삭제
          delete updatedErrors[name];
        } else {
          // value가 유효한 경우 에러 메시지 추가/업데이트
          updatedErrors[name] = error;
        }

        return updatedErrors;
      });
    }
  };
  const resetForm = () => {
    setFormStates(initialState);
    setFormErrors({});
  };

  return { formStates, formErrors, onChangeHandler, resetForm };
};

export default useForm;
