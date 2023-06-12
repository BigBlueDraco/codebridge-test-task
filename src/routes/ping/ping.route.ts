import { Router } from "express";
import PingController, {
  IPingInterface,
} from "../../controllers/pings/pings.controller";

const pingController: IPingInterface = new PingController();
const router: Router = Router();
router.get("/", pingController.get);
export default router;
