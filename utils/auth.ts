import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "./firebase";
export const currentUID = ()=> auth.currentUser?.uid;
export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const data: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(data.user, {
      displayName: name,
    });

    return {
      error: false,
      message: "sucess",
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  if (data.user) {
    return {
      error: false,
      message: "",
    };
  } else {
    return {
      error: true,
      message: "account doesn't exists",
    };
  }
};
