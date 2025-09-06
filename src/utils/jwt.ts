// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

// Validate JWT_SECRET exists at startup
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is required');
    process.exit(1);
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!, // Safe to use ! here because we validated above
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(process.env.JWT_SECRET!, token) as JwtPayload;
        return decoded;
    } catch (error) {
        return null;
    }
};