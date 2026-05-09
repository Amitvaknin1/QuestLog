import { Router } from "express";
import { getAllUsers, getAllQuests, updateUserRole, deleteUser } from "../controllers/admin.controller";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/users", getAllUsers);
router.get("/quests", getAllQuests);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
