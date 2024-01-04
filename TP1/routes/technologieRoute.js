const express = require("express");
const router = express.Router();
const technologieController = require("../controllers/TechnologieControlleur");
const middleware = require("../middlware/middleware");

router.get(
  "/technologie",
  middleware.authenticator,
  technologieController.GetAllTechnology
);
router.get("/technologie/:id", technologieController.GetOneTechnology);
router.post(
  "/technologie/crer",
  middleware.authenticator,
  middleware.roleChecker,
  technologieController.CreateTechnology
);
router.put(
  "/technologie/:id",
  middleware.authenticator,
  middleware.roleChecker,
  technologieController.UpdateTechnology
);
router.delete(
  "/technologie/:id",
  middleware.authenticator,
  middleware.roleChecker,
  technologieController.DeleteTechnology
);

module.exports = router;
