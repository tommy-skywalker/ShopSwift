import { Request, Response } from 'express';
import { Order } from '../models/order.model';

export class OrderController {
  private orders: Order[] = [];

  getAllOrders = (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
      data: this.orders,
      count: this.orders.length
    });
  };

  getOrderById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const order = this.orders.find(o => o.id === id);

    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }

    res.status(200).json({ success: true, data: order });
  };

  createOrder = (req: Request, res: Response): void => {
    const { userId, items, total } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, error: 'UserId and items are required' });
      return;
    }

    const calculatedTotal = total || items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);

    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      items,
      total: calculatedTotal,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.push(newOrder);
    res.status(201).json({ success: true, data: newOrder });
  };

  updateOrder = (req: Request, res: Response): void => {
    const { id } = req.params;
    const orderIndex = this.orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }

    const updatedOrder = {
      ...this.orders[orderIndex],
      ...req.body,
      id,
      updatedAt: new Date()
    };

    this.orders[orderIndex] = updatedOrder;
    res.status(200).json({ success: true, data: updatedOrder });
  };

  deleteOrder = (req: Request, res: Response): void => {
    const { id } = req.params;
    const orderIndex = this.orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }

    this.orders.splice(orderIndex, 1);
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  };
}

