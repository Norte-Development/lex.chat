import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailVerificationData {
  to: string;
  token: string;
  baseUrl: string;
}

export interface PasswordResetData {
  to: string;
  token: string;
  baseUrl: string;
}

// Default email configuration - can be overridden by environment variables
const getEmailConfig = (): EmailConfig => ({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Create reusable transporter object using the default SMTP transport
const createTransporter = () => {
  const config = getEmailConfig();
  return nodemailer.createTransport(config);
};

export const sendEmailVerification = async ({ to, token, baseUrl }: EmailVerificationData): Promise<void> => {
  const transporter = createTransporter();
  
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@lex-ai.chat',
    to,
    subject: 'Verifica tu cuenta en Lex AI Chat',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">⚖️ Lex AI Chat</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Asistente Legal Inteligente</p>
        </div>
        
        <div style="padding: 40px 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #4a5568; margin-bottom: 20px; font-size: 24px;">¡Bienvenido a Lex AI Chat!</h2>
          
          <p style="margin-bottom: 20px; font-size: 16px;">
            Gracias por registrarte en nuestra plataforma de asistencia legal inteligente. Para completar tu registro y acceder a todas las funcionalidades, necesitamos verificar tu dirección de correo electrónico.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              Verificar mi cuenta
            </a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:
          </p>
          <p style="word-break: break-all; font-size: 14px; color: #4a90e2; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
            ${verificationUrl}
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            <strong>¿Por qué verificamos tu email?</strong>
          </p>
          <ul style="font-size: 14px; color: #666; margin-left: 20px;">
            <li>Proteger tu cuenta y datos legales</li>
            <li>Asegurar comunicaciones importantes sobre tus consultas</li>
            <li>Cumplir con estándares de seguridad legal</li>
          </ul>
          
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Este enlace de verificación expirará en 24 horas. Si no solicitaste esta cuenta, puedes ignorar este correo de forma segura.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
          © 2024 Lex AI Chat - Asistente Legal Inteligente para Argentina
        </div>
      </div>
    `,
    text: `
Verifica tu cuenta en Lex AI Chat

¡Bienvenido a Lex AI Chat!

Gracias por registrarte en nuestra plataforma de asistencia legal inteligente. Para completar tu registro, verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:

${verificationUrl}

Este enlace expirará en 24 horas.

Si no solicitaste esta cuenta, puedes ignorar este correo de forma segura.

© 2024 Lex AI Chat - Asistente Legal Inteligente para Argentina
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordReset = async ({ to, token, baseUrl }: PasswordResetData): Promise<void> => {
  const transporter = createTransporter();
  
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@lex-ai.chat',
    to,
    subject: 'Restablece tu contraseña - Lex AI Chat',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔒 Lex AI Chat</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Restablecimiento de Contraseña</p>
        </div>
        
        <div style="padding: 40px 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #4a5568; margin-bottom: 20px; font-size: 24px;">Restablece tu contraseña</h2>
          
          <p style="margin-bottom: 20px; font-size: 16px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en Lex AI Chat. Si no fuiste tú quien solicitó este cambio, puedes ignorar este correo de forma segura.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              Restablecer Contraseña
            </a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:
          </p>
          <p style="word-break: break-all; font-size: 14px; color: #4a90e2; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
            ${resetUrl}
          </p>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              <strong>⚠️ Importante:</strong> Este enlace expirará en 1 hora por razones de seguridad. Si necesitas más tiempo, solicita un nuevo restablecimiento.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            <strong>Consejos de seguridad:</strong>
          </p>
          <ul style="font-size: 14px; color: #666; margin-left: 20px;">
            <li>Utiliza una contraseña única y segura</li>
            <li>Combina letras, números y símbolos</li>
            <li>No compartas tu contraseña con nadie</li>
            <li>Considera usar un gestor de contraseñas</li>
          </ul>
          
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Si no solicitaste este restablecimiento, tu cuenta permanece segura y puedes ignorar este correo.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
          © 2024 Lex AI Chat - Asistente Legal Inteligente para Argentina
        </div>
      </div>
    `,
    text: `
Restablece tu contraseña - Lex AI Chat

Recibimos una solicitud para restablecer la contraseña de tu cuenta en Lex AI Chat.

Para continuar, haz clic en el siguiente enlace:

${resetUrl}

Este enlace expirará en 1 hora por razones de seguridad.

Si no solicitaste este restablecimiento, tu cuenta permanece segura y puedes ignorar este correo.

© 2024 Lex AI Chat - Asistente Legal Inteligente para Argentina
    `
  };

  await transporter.sendMail(mailOptions);
};

// Test email configuration
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email connection test failed:', error);
    return false;
  }
};