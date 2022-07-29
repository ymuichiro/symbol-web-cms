export interface ContextState {}

export interface ContextStore {
  contextState: ContextState;
  updateContext: React.Dispatch<ContextAction>;
}

export type Actions = 'update';

export interface ContextAction {
  type: Actions;
  payload: ContextState;
}
