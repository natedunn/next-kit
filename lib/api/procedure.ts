import { t } from './init';
import { isAdmin, isAuthed } from './middleware';

export const openProcedure = t.procedure;
export const authProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
