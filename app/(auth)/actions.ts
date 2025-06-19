'use server';

import { z } from 'zod';

import { createUser, getUser, createEmailVerificationToken, getUserByEmail, createPasswordResetToken } from '@/lib/db/queries';
import { sendEmailVerification, sendPasswordReset } from '@/lib/email/service';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const passwordResetRequestSchema = z.object({
  email: z.string().email(),
});

const passwordResetSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data' | 'email_not_verified';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Check if user exists and email is verified
    const [user] = await getUser(validatedData.email);
    if (user && !user.emailVerified) {
      return { status: 'email_not_verified' };
    }

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data'
    | 'email_sent';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [existingUser] = await getUser(validatedData.email);

    if (existingUser) {
      return { status: 'user_exists' } as RegisterActionState;
    }

    // Create user with emailVerified: false
    const [newUser] = await createUser(validatedData.email, validatedData.password);
    
    // Create verification token
    const verificationToken = await createEmailVerificationToken(newUser.id);

    // Send verification email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await sendEmailVerification({
      to: validatedData.email,
      token: verificationToken.token,
      baseUrl,
    });

    console.log('newUser', newUser);

    return { status: 'email_sent' };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface PasswordResetRequestState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data' | 'user_not_found';
}

export const requestPasswordReset = async (
  _: PasswordResetRequestState,
  formData: FormData,
): Promise<PasswordResetRequestState> => {
  try {
    const validatedData = passwordResetRequestSchema.parse({
      email: formData.get('email'),
    });

    const user = await getUserByEmail(validatedData.email);

    if (!user) {
      return { status: 'user_not_found' };
    }

    // Create password reset token
    const resetToken = await createPasswordResetToken(user.id);

    // Send password reset email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await sendPasswordReset({
      to: validatedData.email,
      token: resetToken.token,
      baseUrl,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface ResendVerificationState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data' | 'user_not_found' | 'already_verified';
}

export const resendVerificationEmail = async (
  _: ResendVerificationState,
  formData: FormData,
): Promise<ResendVerificationState> => {
  try {
    const validatedData = passwordResetRequestSchema.parse({
      email: formData.get('email'),
    });

    const user = await getUserByEmail(validatedData.email);

    if (!user) {
      return { status: 'user_not_found' };
    }

    if (user.emailVerified) {
      return { status: 'already_verified' };
    }

    // Create new verification token
    const verificationToken = await createEmailVerificationToken(user.id);

    // Send verification email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await sendEmailVerification({
      to: validatedData.email,
      token: verificationToken.token,
      baseUrl,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};
