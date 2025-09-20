import { ApiError } from "@/utils/ApiError";
import * as Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
);

interface EmailOptions {
    to: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
}

export const sendEmail = async (options: EmailOptions) => {
    try {
        const sender = {
            email: process.env.BREVO_SENDER_EMAIL,
            name: process.env.APP_NAME || "Tandoori-Grills",
        };

        const email = new Brevo.SendSmtpEmail();
        email.sender = sender;
        email.to = [{ email: options.to }];
        email.subject = options.subject;
        email.textContent = options.textContent || "";
        email.htmlContent = options.htmlContent;

        const response = await apiInstance.sendTransacEmail(email);
        return response;
    } catch (err: any) {
        // Brevo ka error object parse karo
        console.error("Brevo sendEmail error:", err?.response?.body || err);

        throw new ApiError(
            500,
            err?.message || "Failed to send email. Please try again later."
        );
    }
};

// OTP specific helper
export const sendOtpEmail = async (to: string, otp: string) => {
    const subject = "OTP Verification - Tandoori Grills";
    const htmlContent = `<p>Your email verification OTP is <strong>${otp}</strong>. It will expire in 3 minutes.</p>`;
    return sendEmail({ to, subject, htmlContent });
};
