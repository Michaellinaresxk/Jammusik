import React from "react";
import { Resend } from "resend";
import { RESEND_API_KEY, SEND_FEEDBACK_TO } from "@env";
import Toast from "react-native-toast-message";

const resend = new Resend(RESEND_API_KEY);

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "message sended successfully. 👋",
  });
};

export const useEmailResend = () => {
  const sendEmail = async (
    email: string,
    setEmail: React.SetStateAction,
  ): Promise<unknown> => {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [SEND_FEEDBACK_TO],
      subject: "Feedback",
      text: email,
    });

    console.log(error);

    if (error) {
      throw new Error("Error sending the email");
    }
    showToast();
    setEmail("");
  };

  return {
    sendEmail,
  };
};
