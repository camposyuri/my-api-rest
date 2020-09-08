module.exports = (app) => {
  function notNull(value, msg) {
    if (value === "" || value === null) {
      throw msg;
    }
  }

  function emailValidate(value, msg) {
    const valueEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    if (valueEmail.test(value)) {
      console.log("AEASasasa");
      return msg;
    } else {
      throw new Error(msg);
      // console.log("AEAS");
      // return false;
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

  // function notExistsOrError(value, msg) {
  //   try {
  //     existsOrError(value, msg);
  //   } catch (msg) {
  //     return;
  //   }
  //   throw msg;
  // }

  // function equalsOrError(valueA, valueB, msg) {
  //   if (valueA !== valueB) {
  //     throw msg;
  //   }
  // }

  return {
    emailValidate,
    notNull,
    existsOrError,
    // notExistsOrError,
    // equalsOrError,
  };
};
