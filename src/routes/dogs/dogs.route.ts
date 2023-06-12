import { Router } from "express";
import DogsController, {
  IDogsController,
} from "../../controllers/dogs/dogs.controller";

const dogsController: IDogsController = new DogsController();
const router: Router = Router();
router.get("/", dogsController.getAll);
router.get("/:id", dogsController.getOne);
export default router;
