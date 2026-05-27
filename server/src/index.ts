import path from 'path';
import log from './utils/Logger';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import swStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';
import url from 'url';
import config from './config/config';
import { APIResponse } from './middleware/APIResponse';
import { Middlewares } from './middleware/GlobalMiddlewares';
import { UserRoutes } from './routes';
import { DmRoutes } from './dm-routes';
import { StartScripts } from './ServerStartScripts';
import { SchemaBuilder } from './utils/schema-builder';

//////////////////////////////////////////////////////////
log.info('process.env.NODE_APP_INSTANCE', process.env.NODE_APP_INSTANCE);
log.info('process.env.pm_id', process.env.pm_id);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

(async () => {
    const apiDocsPath = process.env.API_DOCS_PATH || '/api-docs';
    const contextPath = process.env.SSD_BASE_PATH || '/api';
    const port = process.env.SSD_DEFAULT_PORT || 8081;
    const globalTimers = [];
    const generatedMiddlewares: any = {};
    const schemaBuilder = SchemaBuilder.instance;
    await schemaBuilder.buildAPIDocs(contextPath);

    // create express app
    const app = express();
    app.disable('x-powered-by');
    const baseApp = express();
    baseApp.disable('x-powered-by');

    // Call midlewares
    app.use(helmet());

    app.use(express.json());
    // load global pre middlewares here
    app.set('base', contextPath);
    /****************************
     * Load server start scripts
     ****************************/
    await Promise.all(StartScripts.map(startscript => startscript()));
    const routes = [...DmRoutes, ...UserRoutes];
    // initialize all middlewares
    routes.forEach(service => {
        service.getInstance(
            app,
            generatedMiddlewares,
            false,
            true,
            globalTimers
        );
    });

    // load global pre routes
    loadMiddlewares('pre', generatedMiddlewares, app);

    // load all routes
    routes.forEach(service => {
        service.getInstance(
            app,
            generatedMiddlewares,
            true,
            false,
            globalTimers
        );
    });

    // load global pre routes
    loadMiddlewares('post', generatedMiddlewares, app);
    baseApp.use(
        apiDocsPath,
        swaggerUi.serve,
        swaggerUi.setup(schemaBuilder.swaggerDocument)
    );
    app.get(
        '*',
        express.static(path.join(__dirname, 'angular-app')),
        (req, res) => {
            const ssdAppPath = process.env.webAppMountpoint || 'web';
            if (ssdAppPath === '/') {
                res.sendFile(path.join(__dirname, 'angular-app/index.html'));
                return;
            }
            const originalUrl = req.originalUrl;
            const firstPath = new url.URL(
                originalUrl,
                `${req.protocol}://${req.headers.host}/`
            ).pathname
                .split('/')
                .filter(v => v)[0];
            if (firstPath === ssdAppPath) {
                res.sendFile(path.join(__dirname, 'angular-app/index.html'));
                return;
            }
            res.status(404).send('Invalid API endpoint');
        }
    );
    baseApp.use(
        swStats.getMiddleware({
            metricsPrefix: 'sw_stats_',
            swaggerSpec: schemaBuilder.swaggerDocument,
            timelineBucketDuration: 60000,
        })
    );
    // generic responses
    app.use(APIResponse);
    baseApp.use(app);
    // run app
    baseApp.listen(port);

    log.info(`Server context path: ${contextPath}`);
    log.info(`Server API docs path: ${apiDocsPath}`);
    log.info(`Server is up and running on port: ${port}`);
})().catch(log.error);

function loadMiddlewares(preOrPost: string, generatedMiddlewares, app) {
    config['middlewares']?.[preOrPost].forEach(mw => {
        const key: string = Object.entries(mw)[0][0];
        const value: string = '' + Object.entries(mw)[0][1];
        if (generatedMiddlewares[key]?.[value]) {
            app.use(generatedMiddlewares[key][value].functionDef);
            return;
        }
        if (key === '__ssdGlobalMiddlewares__' && Middlewares[value]) {
            app.use(Middlewares[value]());
        }
    });
}
