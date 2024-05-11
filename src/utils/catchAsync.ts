import { NextRequest, NextResponse } from 'next/server';

export const catchAsync = (handler: (req: NextRequest, res: NextResponse, next: () => void) => Promise<void>) =>
  (req: NextRequest, res: NextResponse, next: () => void) =>
    Promise.resolve(handler(req, res, next)).catch(next);