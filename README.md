# react-three-mega-comet
This project was generated with [react-three.org](https://react-three.org)
A github pages deployment action is configurd.
A GitHub CI/CD workflow for publishing to Viverse is configured.

To use publish to viverse via the CI/CD workflow:
1. Set `VIVERSE_EMAIL` and `VIVERSE_PASSWORD` secrets in your repository settings under `Secrets and Variables` > `Actions` > `New repository secret`
2. Manually trigger the "Deploy to Viverse" workflow or push to the main branch

**Manual CLI Upload:**
You can also upload your project manually using the Viverse CLI:
```bash
viverse-cli auth login -e <email> -p <password>
npm run build
viverse-cli app publish ./dist --auto-create-app --name react-three-mega-comet
```



## Project Architecture
This project uses [Vite](https://vitejs.dev/) as the bundler for fast development and optimized production builds.
- `app.tsx` defines the main application component containing your 3D content
- Modify the content inside the `<Canvas>` component to change what is visible on screen
- Static assets can be placed in the `public` folder


## Libraries
The following libraries are used - checkout the linked docs to learn more
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Three.js](https://threejs.org/) - JavaScript 3D library
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) - lets you create Three.js scenes using React components
- [@react-three/drei](https://drei.docs.pmnd.rs/) - Useful helpers for @react-three/fiber
- [@react-three/handle](https://pmndrs.github.io/xr/docs/handles/introduction) - interactive controls and handles for your 3D objects
- [koota](https://github.com/pmndrs/koota) - ECS-based state management library optimized for real-time apps, games, and XR experiences
- [leva](https://github.com/pmndrs/leva) - HTML GUI panel for React with lightweight, beautiful and extensible controls
- [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) - Physics based on Rapier for your @react-three/fiber scene
- [@react-three/uikit](https://pmndrs.github.io/uikit/docs/) - UI primitives for React Three Fiber
- [@react-three/xr](https://pmndrs.github.io/xr/docs/) - VR/AR support for @react-three/fiber
- [zustand](https://zustand.docs.pmnd.rs/) - small, fast and scalable state-management solution


## Tools
- [Triplex](https://triplex.dev) - Your visual workspace for React / Three Fiber. Get started by installing [Triplex for VS Code](https://triplex.dev/docs/get-started/vscode). Don't use Visual Studio Code? Download [Triplex Standalone](https://triplex.dev/docs/get-started/standalone).


## Development Commands
- `npm install` to install the dependencies
- `npm run dev` to run the development server and preview the app with live updates
- `npm run build` to build the app into the `dist` folder
