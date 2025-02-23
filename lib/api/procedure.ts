import { t } from "./init";
import { isAuthed } from "./middleware";

export const openProcedure = t.procedure;
export const authProcedure = t.procedure.use(isAuthed);
