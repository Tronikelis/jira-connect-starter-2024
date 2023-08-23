import fsAsync from "node:fs/promises";
import path from "node:path";

import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import __dirname from "~/utils/__dirname.js";

import authorizeLifecycle from "./utils/authorizeLifecycle.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
    /**
     * IMPORTANT !!!
     * Read: https://developer.atlassian.com/cloud/confluence/connect-app-descriptor/#lifecycle-http-request-payload
     */

    fastify.post("/installed", async (req, reply) => {
        if (!(await authorizeLifecycle(req.headers.authorization || ""))) {
            throw new Error("request not coming from atlassian");
        }

        // todo
    });

    fastify.post("/uninstalled", async (req, reply) => {
        if (!(await authorizeLifecycle(req.headers.authorization || ""))) {
            throw new Error("request not coming from atlassian");
        }

        // todo
    });

    fastify.post("/enabled", async (req, reply) => {
        if (!(await authorizeLifecycle(req.headers.authorization || ""))) {
            throw new Error("request not coming from atlassian");
        }

        // todo
    });

    fastify.get("/descriptor", async (req, reply) => {
        const descriptor = path.join(
            __dirname(import.meta.url),
            "../../../atlassian-connect.json"
        );

        const fileContents = JSON.parse(
            await fsAsync.readFile(descriptor, { encoding: "utf-8" })
        ) as Record<string, any>;

        fileContents.baseUrl = process.env.API_BASE_URL;

        return fileContents;
    });

    done();
};

export default fp(plugin);
