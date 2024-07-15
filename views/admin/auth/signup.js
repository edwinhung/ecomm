const layout = require("../layout");

const getError = (error, prop) => {
  try {
    return error.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, error }) => {
  return layout({
    content: `
        <div>
            Your id is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(error, "email")}
                <input name="password" placeholder="password" />
                ${getError(error, "password")}
                <input name="passwordConfirmation" placeholder="password confirmation" />
                ${getError(error, "passwordConfirmation")}
                <button>Sign Up</button>
            </form>
        </div>
    `,
  });
};
