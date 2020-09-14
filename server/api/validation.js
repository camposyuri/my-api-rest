module.exports = (app) => {
  function notNull(value, msg) {
    if (value === "" || value === null) {
      throw msg;
    }
  }

  function emailValidate(value, msg) {
    const valueEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    if (valueEmail.test(value)) {
      return;
    } else {
      throw msg;
    }
  }

  function existsOrError(value, msg) {
    if (!value) {
      throw msg;
    }

    if (Array.isArray(value) && value.length === 0) {
      throw msg;
    }

    if (typeof value === "string" && !value.trim()) {
      throw msg;
    }
  }

  return {
    emailValidate,
    notNull,
    existsOrError,
  };
};
