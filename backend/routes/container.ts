import { Router } from "express";

import * as containerController from "../controllers/containerController.ts";

const router = Router();

router.get("/", containerController.fetchContainers);

router.get("/:id", containerController.getContainerInfo);

router.delete("/:id", containerController.deleteContainer);

router.post("/:id/start", containerController.startContainer);

router.post("/:id/stop", containerController.stopContainer);

router.post("/:id/restart", containerController.restartContainer);

export default router;
