import { Router } from "express";
import DogsController, {
  IDogsController,
} from "../../controllers/dogs/dogs.controller";

const dogsController: IDogsController = new DogsController();
const router: Router = Router();
router.post("/", dogsController.dogsValidator, dogsController.create);

router.get("/", dogsController.getAll);
router.get("/:id", dogsController.dogMustExist, dogsController.getOne);

router.patch(
  "/:id",
  dogsController.dogMustExist,
  dogsController.dogsValidator,
  dogsController.update
);

router.delete("/:id", dogsController.dogMustExist, dogsController.delete);
export default router;
