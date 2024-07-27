// middleware/protect.js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '@/models/user'; // Adjust the import according to your project structure

export const protect = async (req: { headers: { authorization: string; }; user: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token does not exist.' });
    }
    
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({ message: 'The user recently changed their password! Please log in again.' });
    }

    req.user = currentUser; // Attach the user to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed. Please log in again.' });
  }
};


