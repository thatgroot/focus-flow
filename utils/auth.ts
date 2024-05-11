import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "@firebase/auth";
import { auth } from "./firebase";
import { controllers } from "./crud";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { t } from "./helpers";

export const register = async ({
  name,
  email,
  password,
  onError = (error: any) => console.error(error),
  onSuccess = (id: string) => console.info(id),
}: {
  name: string;
  email: string;
  password: string;
  onError?: (error: any) => void;
  onSuccess?: (id: string) => void;
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(user);
    await updateProfile(user, { displayName: name });
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

    onSuccess("Please check your email for verification link");
    return {
      error: false,
      message: "success",
    };
  } catch (error: any) {
    onError(error);
    return {
      error: true,
      message: error.message,
    };
  }
};

export const signin = async ({
  email,
  password,
  onError,
  onSuccess,
}: {
  email: string;
  password: string;
  onError: (error: any) => void;
  onSuccess: () => void;
}) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      if (user) {
        if (user.emailVerified) {
          onSuccess();
        } else {
          onError("Your email is not verified");
        }
      } else {
        onError("account doesn't exists");
      }
    })
    .catch((error: any) => {
      console.log("error", error.code);
      let message = "";
      if (error.code === "auth/too-many-requests") {
        message = t("too_many_requests");
      } else if (error.code === "auth/invalid-credential") {
        message = t("invalid_credentials");
      } else if (error.code === "auth/invalid-email") {
        message = t("invalid_mail_address");
      } else {
        // message = t("failed_login");
        message = error.code;
      }
      //
      onError(message);
    });
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
    reauthenticateWithCredential(
      auth.currentUser!,
      EmailAuthProvider.credential(auth.currentUser?.email!, "bdz035Iq")
    ).then((creds) => {
      updatePassword(auth.currentUser!, value)
        .then(() => {
          onSuccess("password udated successfully");
        })
        .catch(onError);
    });
  },

  forgotPassword: ({
    email,
    onSuccess,
    onError,
  }: CreateDocumentTypScaffold & { email: string }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        onSuccess("Please check your email for reset link");
      })
      .catch(onError);
  },
};
