import express, { Express, Request, Response } from "express";

export interface IDogsController {
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
import { Dogs } from "../../models/dogs.model";

export default class DogsController implements IDogsController {
  private handleError(res: Response, statusCode: number, err: any): void {
    console.error(err);
    res.status(statusCode).json({ message: err });
  }
  private async checkDogExists(id: string, res: Response): Promise<void> {
    try {
      const dog = await Dogs.findByPk(id);
      if (!dog) {
        res.status(404).json({ message: "dog doesn't exist" });
      }
    } catch (err) {}
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { attribute = "id", order = "ASC" } = req.query;
      const { limit = 10, offset = 1 } = req.query;
      const amount = await Dogs.count();

      const dogs: Dogs[] = await Dogs.findAll({
        limit: +limit,
        offset: +offset,
        order: [[`${attribute}`, `${order}`]],
      });
      const pagination = {
        totalItems: amount,
        itemCount: dogs.length,
        totalPages: Math.round(amount / +limit),
        currentPage: +offset,
      };
      res.status(200).json({
        dogs: dogs,
        pagination,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dog: Dogs | null = await Dogs.findOne({
        where: { id },
      });
      res.status(200).json(dog);
    } catch (err) {
      this.handleError(res, 500, err);
    }
  }
  async create(req: Request, res: Response): Promise<void> {
    const { name, ...defaults } = req.body;
    try {
      const [dog, isCreated] = await Dogs.findOrCreate({
        where: { name: name },
        defaults: { ...defaults },
      });

      if (!isCreated) {
        res.status(409).json({ message: "dog's name alredy exist" });
      }
      res.status(201).json(dog);
    } catch (err) {
      console.error(err);
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      this.checkDogExists(id, res);

      await Dogs.destroy({ where: { id } });
      res.status(204).json({ id: id });
    } catch (err) {
      this.handleError(res, 500, err);
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      this.checkDogExists(id, res);

      await Dogs.update(
        { ...req.body },
        {
          where: {
            id: id,
          },
        }
      );
      const updatedDog: Dogs | null = await Dogs.findOne({ where: { id } });
      res.status(200).json(updatedDog);
    } catch (err) {
      this.handleError(res, 500, err);
    }
  }
}
