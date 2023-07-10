# cra-template-jw-mst

> From 6.0.0, I removed default support for Class Component. If you need it, replace mobx-react-lite with mobx-react
>
> Meanwhile, the template using 3rd party Error boundary, and the structure also changes a little bit.

This is a Create React App Template with React Router, Mobx State Tree, TypeScript.

It installs these dependencies for you, and allow your to customize webpack config.

To use this template, add `--template jw-mst` when creating a new app.

### To make husky work

After initialization run following command

```sh
npm run prepare

# or

yarn prepare
```

For example:

```sh
npx create-react-app my-app --template cra-template-jw-mst

# or

yarn create react-app my-app --template cra-template-jw-mst
```

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
