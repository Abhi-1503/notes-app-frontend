// src/types/express.d.ts
import { Request } from 'express';

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }
  
  // You MUST include this for the global augmentation to be applied:
  export {};
  