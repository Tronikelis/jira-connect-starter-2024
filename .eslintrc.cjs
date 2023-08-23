module.exports = {
    extends: "tronikelis-react",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./backend/tsconfig.json", "./frontend/tsconfig.json"],
    },
};
