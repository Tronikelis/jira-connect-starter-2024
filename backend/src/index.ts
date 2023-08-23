import path from "node:path";

import dotenv from "dotenv";
import Fastify from "fastify";

dotenv.config({ path: path.join(__dirname(import.meta.url), "../.env") });

import jiraPlugin from "./plugins/jira/index.js";
import __dirname from "./utils/__dirname.js";

async function main() {
    const port = parseInt(process.env.PORT as string);

    const fastify = Fastify({ logger: true });

    await fastify.register(jiraPlugin);

    fastify.listen({ host: "0.0.0.0", port }, err => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
}

main().catch(err => {
    console.log(err);
    process.exit(1);
});
