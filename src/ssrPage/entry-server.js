import createApp from './main';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();
        // set server-side router's location
        router.push(context.url);

        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                console.error(`Route not found, fallback from 'entry-server.js': '${context.url}'`);
                // TODO: You have not handle 404 here.
                // Can reject for server to handle this case
            }

            // the Promise should resolve to the app instance so it can be rendered
            resolve(app);
        }, reject);
    });
};
