import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validateMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let validationErrors = [];

    const validation = plainToInstance(schema, body);
    validate(validation, {}).then((errors) => {
      if (errors.length) {
        const { property, constraints } = errors[0];
        validationErrors.push({
          field: property,
          messages: [constraints],
        });

        return res.status(400).json(validationErrors);
      }

      next();
    });
  };
};

export default validateMiddleware;
