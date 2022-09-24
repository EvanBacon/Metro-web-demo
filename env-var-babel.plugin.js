// Babel plugin to replace process.env.EXPO_PROJECT_ROOT with the project root

const { relative } = require("path");

module.exports = function (api) {
  const { types: t } = api;

  return {
    name: "expo-router",
    visitor: {
      // Convert `process.env.EXPO_ROUTER_APP_ROOT` to a string literal
      MemberExpression(path, state) {
        if (
          !t.isIdentifier(path.node.object, { name: "process" }) ||
          !t.isIdentifier(path.node.property, { name: "env" })
        ) {
          return;
        }

        const parent = path.parentPath;
        if (!t.isMemberExpression(parent.node)) {
          return;
        }

        if (
          !t.isIdentifier(parent.node.property, {
            name: "EXPO_PROJECT_ROOT",
          })
        ) {
          return;
        }

        if (parent.parentPath.isAssignmentExpression()) {
          return;
        }

        parent.replaceWith(
          t.stringLiteral(process.env.EXPO_PROJECT_ROOT || state.file.opts.root)
        );
      },
    },
  };
};
