import express, { Express, Request, Response } from "express";

export interface IDogsController {
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
import { Dogs } from "../../models/dogs.model";

function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}
export default class DogsController implements IDogsController {
  private handleError(res: Response, statusCode: number): void {
    console.error();
    res.status(statusCode).json();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const dogs: Dogs[] = await Dogs.findAll();
      res.status(200).json(dogs);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dog: Dogs | null = await Dogs.findOne({ where: { id } });
      res.status(200).json(dog);
    } catch (e) {}
  }
  async create(req: Request, res: Response): Promise<void> {
    const { name, ...defaults } = req.body;
    try {
      const [dog, isCreated] = await Dogs.findOrCreate({
        where: { name: req.body.name },
        defaults: defaults,
      });
      if (!isCreated) {
        res.status(409).json({ message: "dog name alredy exist" });
      }
      res.status(201).json(dog);
    } catch (e) {}
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dog: Dogs | null = await Dogs.findOne({ where: { id } });
      if (!dog) {
        res.status(404).json({ message: "dog doesn't exist" });
      }
      await Dogs.destroy({ where: { id } });
      res.status(204).json({ id: id });
    } catch (e) {}
  }
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const dog: Dogs | null = await Dogs.findOne({ where: { id } });
      if (!dog) {
        res.status(404).json({ message: "dog doesn't exist" });
      }
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
    } catch (e) {}
  }
}
