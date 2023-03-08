import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class UserController {
  private users: User[] = [];

  getAllUsers = (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
      data: this.users,
      count: this.users.length
    });
  };

  getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const user = this.users.find(u => u.id === id);

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  };

  createUser = (req: Request, res: Response): void => {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      res.status(400).json({ success: false, error: 'Name and email are required' });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      address: address || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
  };

  updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const userIndex = this.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...req.body,
      id,
      updatedAt: new Date()
    };

    this.users[userIndex] = updatedUser;
    res.status(200).json({ success: true, data: updatedUser });
  };

  deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const userIndex = this.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    this.users.splice(userIndex, 1);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  };
}

