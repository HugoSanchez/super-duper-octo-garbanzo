import { AppType } from "../types";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
};
  
export enum AppActionTypes {
    Loading = 'SET_APP_LOADING',
    Set_Toaster = 'SET_RENDER_TOASTER',
    Set_Toaster_Success = 'SET_TOASTER_SUCCESS',
    Set_Toaster_Message = 'SET_TOASTER_MESSAGE',
}
  
type AppPayload = {
    [AppActionTypes.Loading]: {
      loading: boolean;
    };
    [AppActionTypes.Set_Toaster]: {
        toaster: {
            render: boolean,
            success: boolean,
            message: string | undefined,
            loading: boolean
        }
    };
}

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];


export const appReducer = (state: AppType, action: AppActions) => {
    switch (action.type) {
        case AppActionTypes.Loading:
        return {
            ...state, loading: action.payload.loading
        }  
        case AppActionTypes.Set_Toaster:
            let {render, success, message, loading} = action.payload.toaster;
        return {
            ...state, toasterLoading: loading, renderToaster: render, toasterSuccess: success, toasterMessage: message
        }    
        default:
            return state;
    }
}
