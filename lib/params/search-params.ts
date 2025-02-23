import { createLoader, parseAsBoolean, parseAsString } from "nuqs/server";

export const exampleSearchParams = createLoader({
	exampleString: parseAsString.withDefault("Hello World (default value)"),
	redirect: parseAsBoolean.withDefault(true),
});
