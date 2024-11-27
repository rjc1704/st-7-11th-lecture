export const validateForm = (name, value) => {
  switch (name) {
    case "id":
      if (value.length < 4 || value.length > 10) {
        return "아이디는 4~10글자여야 합니다.";
      }
      break;
    case "password":
      if (value.length < 4 || value.length > 15) {
        return "비밀번호는 4~15글자여야 합니다.";
      }
      break;
    case "nickname":
      if (value.length < 2 || value.length > 10) {
        return "닉네임은 2~10글자여야 합니다.";
      }
      break;
    default:
      return "";
  }
  return "";
};
