import { Request, Response, NextFunction } from "express";

// * --- Third-party Packages ---
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

// Build middleware validateMiddleware for todo validation
const validateMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let validationErrors = [];

    // Checking whether there is an error or not
    const validation = plainToInstance(schema, body);
    validate(validation, {}).then((errors) => {
      if (errors.length) {
        const { property, constraints } = errors[0];

        // Pushing the error along with its message to display to the user
        validationErrors.push({
          field: property,
          messages: [constraints],
        });

        // show validation errors
        return res.status(400).json(validationErrors);
      }

      // If there is no problem with todo validation, it will go to the next middleware.
      next();
    });
  };
};

export default validateMiddleware;
