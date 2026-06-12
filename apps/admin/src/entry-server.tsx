import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";

const handler = defineHandlerCallback(defaultStreamHandler);
const fetch = createStartHandler(handler);

export default createServerEntry({
  fetch,
});
