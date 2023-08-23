import path from "node:path";

import fastifyStatic from "@fastify/static";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import __dirname from "~/utils/__dirname.js";

const plugin: FastifyPluginAsync = async (fastify, _) => {
    const frontendPath = path.join(__dirname(import.meta.url), "../../../../frontend/");

    await fastify.register(fastifyStatic, {
        root: path.join(frontendPath, "./dist/assets"),
        prefix: "/assets/",
    });

    fastify.get("*", async (req, reply) => {
        return await reply.sendFile("index.html", path.join(frontendPath, "./dist"));
    });
};

export default fp(plugin);
