import axios from "axios";

export const getSecretWord = async (
  setSecretWord: (setSecretWord: string) => void
) => {
  const { data } = await axios.get("http://localhost:3030");
  setSecretWord(data);
};
