module.exports = (app) => {
  const { existsOrError, emailValidate, notNull } = app.api.validation;

  const save = (req, res) => {
    const user = { ...req.body };

    if (req.params.id) {
      user.id = req.params.id;
    }

    try {
      notNull(user.name, "Name not informed.");
      notNull(user.email, "Email not informed.");

      emailValidate(user.email, "Email is not valid.");

      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("users")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "User not found.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const limit = 10;
  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("users").count("id").first();
    const count = parseInt(result.count);

    app
      .db("users")
      .select("id", "name", "email", "admin")
      .orderBy("id")
      .limit(limit)
      .offset(page * limit - limit)
      .then((users) =>
        res.json({
          data: users,
          count,
          limit,
        })
      )
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("users")
      .where({ id: req.params.id })
      .first()
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
// if (user.id) {
//   app
//     .db("users")
//     .update(user)
//     .where({ id: user.id })
//     .then((_) => res.status(204).send())
//     .catch((err) => res.status(500).send(err));
// }
