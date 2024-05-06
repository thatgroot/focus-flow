import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "./firebase";
import { controllers } from "./crud";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

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

    controllers.userInfo.add({
      data: {
        name: name,
      },
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (id) => {
        console.info(id);
      },
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
export const inputRegex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  text: /^[a-zA-Z\s]*$/,
  number: /^[0-9]*$/,
};

export const updateUser = {
  email: ({
    value,
    onSuccess,
    onError,
  }: CreateDocumentTypScaffold & { value: string }) => {
    if (inputRegex["email"].test(value) && auth.currentUser) {
      try {
        verifyBeforeUpdateEmail(auth.currentUser, value)
          .then(() => {
            onSuccess("Please verify your new email");
          })
          .catch(onError);
        // updateEmail(auth.currentUser, value)
        // .then(() => {
        //   onSuccess("email udated successfully");
        // })
      } catch (error) {
        onError(error);
      }
    } else {
      onError("Ensure your email follows this format: localpart@domain.tld.");
    }
  },

  password: ({
    value,
    onSuccess,
    onError,
  }: CreateDocumentTypScaffold & { value: string }) => {
    reauthenticateWithCredential(auth.currentUser!,EmailAuthProvider.credential(auth.currentUser?.email!,"bdz035Iq")).then((creds)=>{
      updatePassword(auth.currentUser!, value)
      .then(() => {
        onSuccess("password udated successfully");
      })
      .catch(onError);
    })

  },
};
