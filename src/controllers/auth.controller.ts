import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserController } from './user.controller';

const authService = new AuthService();
const userController = new UserController();

export class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role = 'customer' } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
        return;
      }

      const hashedPassword = await authService.hashPassword(password);
      const user = await userController.createUserInternal({
        name,
        email,
        password: hashedPassword,
        role
      });

      const token = authService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role || 'customer'
      });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Registration failed' });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, error: 'Email and password are required' });
        return;
      }

      const user = await userController.findUserByEmailInternal(email);

      if (!user) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }

      const isValidPassword = await authService.comparePassword(
        password,
        user.password || ''
      );

      if (!isValidPassword) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }

      const token = authService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role || 'customer'
      });

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Login failed' });
    }
  };
}

