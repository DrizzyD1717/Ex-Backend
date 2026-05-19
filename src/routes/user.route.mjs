import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.mjs";
import { body } from "express-validator";

const router = express.Router();

// Because these both use the '/' path, we can chain them together!
router
  .route("/")
  .post(
    // Add the middleware array BEFORE the controller
    [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be text"),
      body("email").isEmail().withMessage("Must be a valid email address"),
      body("age")
        .optional() // age isn't required in our schema
        .isNumeric()
        .withMessage("Age must be a number"),
    ],
    createUser, // <-- Controller runs AFTER validation
  )
  .get(getUsers);

// These all use the '/:id' path, so we can chain them too
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
