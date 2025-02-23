import type { BuildRefine } from "node_modules/drizzle-zod/schema.types.internal.d.ts";
import type { SchemaCrud } from "../utils";
import { z } from "zod";
import * as auth from "../tables/auth";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";

//
// User
const refineUser = {} satisfies BuildRefine<typeof auth.user>;

export const userSchema = {
	create: createInsertSchema(auth.user, refineUser),
	read: createSelectSchema(auth.user, refineUser),
	update: createUpdateSchema(auth.user, refineUser),
	delete: createUpdateSchema(auth.user, refineUser).pick({ id: true }),
};
export type UserSchema = SchemaCrud<typeof userSchema>;
