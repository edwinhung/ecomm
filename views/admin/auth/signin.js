const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ error }) => {
  return layout({
    content: `
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(error, "email")}
                <input name="password" placeholder="password" />
                ${getError(error, "password")}
                <button>Sign In</button>
            </form>
        </div>
    `,
  });
};
