import axios from "axios";
import jwt from "jsonwebtoken";

export default async function authorizeLifecycle(authorization: string): Promise<boolean> {
    const dangerousJwt = authorization.split(" ").at(-1);
    if (!dangerousJwt) return false;

    const decoded = jwt.decode(dangerousJwt, { complete: true });
    if (!decoded) return false;

    const kid = decoded.header.kid;
    if (!kid) return false;

    try {
        const { data: publicKey } = await axios.get<string>(
            `https://connect-install-keys.atlassian.com/${kid}`
        );

        jwt.verify(dangerousJwt, Buffer.from(publicKey, "utf-8"));
        return true;
    } catch {
        /* empty */
    }

    return false;
}
