module.exports = (app) => {
  function existsOrError(value, msg) {
    if (!value) {
      console.log("here 1");
      throw msg;
    }

    if (Array.isArray(value) && value.length === 0) {
      console.log("here 2");
      throw msg;
    }

    if (value === null) {
      console.log("here 3");
      throw msg;
    }

    if (typeof value === "string" && !value.trim()) {
      console.log("here 4");
      throw msg;
    }
  }

  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) {
      throw msg;
    }
  }

  return {
    existsOrError,
    notExistsOrError,
    equalsOrError,
  };
};
