module.exports = (app) => {
  app.route("/users").get(app.api.user.get).post(app.api.user.save);
  app
    .route("/users/:id")
    .get(app.api.user.getById)
    .put(app.api.user.alterUser)
    .patch(app.api.user.alterPatch)
    .delete(app.api.user.remove);
};
