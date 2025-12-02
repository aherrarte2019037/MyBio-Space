import { nanoid } from "nanoid";

export const shortId = (length = 10) => nanoid(length);
