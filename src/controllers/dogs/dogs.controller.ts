import express, { Express, Request, Response } from "express";

export interface IDogsController {
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
export default class DogsController implements IDogsController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      res.send("list of dogs");
    } catch (e) {}
  }
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      res.send("dog");
    } catch (e) {}
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      res.send("created dog");
    } catch (e) {}
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      res.send("deleted dog id");
    } catch (e) {}
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      res.send("updated dog");
    } catch (e) {}
  }
}
