import crypto from "node:crypto";

import jwt from "jsonwebtoken";

export type Input = {
    sharedSecret: string;
    relativeUrl: string;
    method: string;
    appKey: string;
};

export default function signOutgoingJwt({
    sharedSecret,
    relativeUrl,
    method,
    appKey,
}: Input): string {
    // eslint-disable-next-line prefer-const
    let [base, querystring] = relativeUrl.split("?");

    if (!base) {
        throw new Error("url is wrong, base is missing");
    }

    if (base.at(-1) === "/") {
        base = base.slice(0, base.length - 1);
    }

    let canonicalRequest = method.toUpperCase();
    canonicalRequest += `&${base}&`;

    if (querystring) {
        canonicalRequest += querystring;
    }

    const secret = jwt.sign(
        {
            iss: appKey,
            qsh: crypto.createHash("sha256").update(canonicalRequest).digest().toString("hex"),
        },
        sharedSecret,
        { expiresIn: "3m" }
    );

    return secret;
}
