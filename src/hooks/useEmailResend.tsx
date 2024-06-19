import React, { useState } from "react";
import { Resend } from "resend";
import { RESEND_API_KEY, SEND_FEEDBACK_TO } from "@env";
import Toast from "react-native-toast-message";
import { err } from "react-native-svg";

const resend = new Resend(RESEND_API_KEY);

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "message sended successfully. 👋",
  });
};


export const useEmailResend = () => {



  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendEmail = async (
    email: string, setText: React.Dispatch<React.SetStateAction<string>>
  ) => {

    console.log(email)
    try {
      setIsLoading(true)
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
      setIsLoading(false)
      showToast();
      setText("");
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  return {
    sendEmail, isLoading
  };



};
