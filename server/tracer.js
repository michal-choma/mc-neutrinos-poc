import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector-grpc';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { config }  from 'dotenv';
import { sep }  from 'path';
const envFileName = process.env.NEUTRINOS_APP_ENV ? `${process.env.NEUTRINOS_APP_ENV}.env` : 'dev.env';
const envFilePath = `${process.cwd()}${sep}environments${sep}${envFileName}`;
console.log('env-file-path', envFilePath)
config({ path: envFilePath });

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: process.env.NEU_APP_NAME,
    }),
});

const collectorTraceExporter = new CollectorTraceExporter({
    url: process.env.NEU_TRACE_COLLECTOR_URL,
});
const collectorProvider = new SimpleSpanProcessor(collectorTraceExporter);
provider.addSpanProcessor(collectorProvider);
provider.register();

registerInstrumentations({
    instrumentations: [
        getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-fs': {
                enabled: false,
              }
        }),
        new ExpressInstrumentation(),
        new MongoDBInstrumentation({
            enhancedDatabaseReporting: true,
        }),
    ],
});
