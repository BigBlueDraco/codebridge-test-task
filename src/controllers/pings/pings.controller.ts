import express, { Express, Request, Response } from "express";

export interface IPingInterface {
  get(req: Request, res: Response): void;
}
export default class PingController implements IPingInterface {
  get(req: Request, res: Response): void {
    res.send("Dogshouseservice.Version1.0.1");
  }
}
