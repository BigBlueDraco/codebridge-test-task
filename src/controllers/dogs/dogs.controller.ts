import { NextFunction, Request, Response } from "express";
import Joi, { any } from "joi";
import { Dogs } from "../../models/dogs.model";

export interface IDogsController {
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  dogsValidator(req: Request, res: Response, next: NextFunction): void;
  dogMustExist(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default class DogsController implements IDogsController {
  dogsValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const { method = "PATH" } = req;
      const { name, color, tail_length, weight } = req.body;

      const dogSchema = {
        PATH: Joi.object({
          name: Joi.string(),
          color: Joi.string(),
          tail_length: Joi.number().positive(),
          weight: Joi.number().positive(),
        }),
        POST: Joi.object({
          name: Joi.string().required(),
          color: Joi.string().required(),
          tail_length: Joi.number().required().positive(),
          weight: Joi.number().required().positive(),
        }),
      };

      let isValid: any;
      switch (method) {
        case "PATH": {
          const { error } = dogSchema.PATH.validate({
            name: name,
            color: color,
            tail_length: tail_length,
            weight: weight,
          });
          isValid = error;
          break;
        }

        case "POST": {
          const { error } = dogSchema.POST.validate({
            name: name,
            color: color,
            tail_length: tail_length,
            weight: weight,
          });
          isValid = error;
          break;
        }

        default:
          isValid = false;
      }

      if (isValid) {
        res.status(400).json({ message: isValid.details[0].message });
        return;
      }
      if (!isValid) {
        next();
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: `${err}` })
        .end();
    }
  }
  async dogMustExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const dog = await Dogs.findByPk(id);
    if (!dog) {
      res.status(404).json({ message: "dog doesn't exist" }).end();
      return;
    }
    next();
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
      console.log(err);
      res
        .status(500)
        .json({ message: `${err}` })
        .end();
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
      console.log(err);
      res
        .status(500)
        .json({ message: `${err}` })
        .end();
    }
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, ...defaults } = req.body;
      const [dog, isCreated] = await Dogs.findOrCreate({
        where: { name: name },
        defaults: { ...defaults },
      });

      if (!isCreated) {
        res.status(409).json({ message: "dog's name alredy exist" }).end();
        return;
      }
      res.status(201).json(dog);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `${err}` });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dog = await Dogs.findByPk(id);
      if (!dog) {
        res.status(404).json({ message: "dog doesn't exist" });
      }

      await Dogs.destroy({ where: { id } });
      res.status(204).json({ id: id });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: `${err}` })
        .end();
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
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
      console.log(err);
      res
        .status(500)
        .json({ message: `${err}` })
        .end();
    }
  }
}
