class Env {
  static SMTP_HOST: string = process.env.SMTP_HOST!;
  static SMTP_PORT: string = process.env.SMTP_PORT!;
  static SMTP_USER: string = process.env.SMTP_USER!;
  static SMTP_PASSWORD: string = process.env.SMTP_PASSWORD!;
  static SMTP_SECURE: string = process.env.SMTP_SECURE!;
  static EMAIL_FROM: string = process.env.EMAIL_FROM!;
  static SECRET_KEY: string = process.env.NEXTAUTH_SECRET!;
  static APP_URL: string = process.env.APP_URL!;
  static MONGO_URL: string = process.env.MONGO_URL!;
  static JWT_SECRET: string = process.env.JWT_SECRET!;
}

export default Env;
