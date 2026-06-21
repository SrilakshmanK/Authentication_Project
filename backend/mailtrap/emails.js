
import { mailtrapClient, sender } from "./mailtrap.config.js"
import{  VERIFICATION_EMAIL_TEMPLATE , WELCOME_EMAIL} from './emailTemplates.js'
import { json } from "express"

export const sendVerificationEmail= async (email,verificationToken) => {
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Verify your email",
      html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken)
      
    })
    console.log("Email sent successfully",response)
  } catch (error) {
    console.error(`Error sending verification`,error)
  }
}

export const sendWelcomeEmail = async (email,name) => {

  const recipient = [{email}];

  try {
    const response =  await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Welcome Email",
      html:WELCOME_EMAIL.replace("{name}",name)
    })
    console.log("Email sent successfully",response)
  } catch (error) {
    console.error("Erron sending welcome mail",error)
  }

}