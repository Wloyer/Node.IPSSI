const express = require("express");
const router = express.Router();
const utilisateursController = require("../controllers/utilisateursController");
const middleware = require("../middlware/middleware");

router.get("/utilisateurs", utilisateursController.GetAllUsers);
router.get("/:id", utilisateursController.GetOneUser);
router.post("/crer", middleware.roleChecker, utilisateursController.CreateUser);
router.put("/:id", utilisateursController.UpdateUser);
router.delete("/:id", utilisateursController.DeleteUser);
router.post(
  "/commentaires",
  middleware.roleChecker,
  utilisateursController.CreateComment
);
router.get(
  "/commentaire/technologie/:technologieId",
  middleware.authenticator,
  utilisateursController.GetTechnologieComments
);
router.get(
  "/commentaires/:id",
  middleware.authenticator,
  utilisateursController.UserComments
);
router.get(
  "/commentaires/avant/:date",
  utilisateursController.GetAllCommentsBefore
);
router.post("/register", utilisateursController.Register);
router.post("/login", utilisateursController.Login);

module.exports = router;
