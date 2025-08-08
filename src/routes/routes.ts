import { Router } from "express";

import { transactionsRoutes } from "./transactionsRoutes";

export const router = Router();

router.use(transactionsRoutes);
