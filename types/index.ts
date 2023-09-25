export type AppType = {
    loading: boolean,
    renderToaster: boolean,
    toasterSuccess: boolean,
    toasterMessage: string | undefined,
}
    
export type InitialStateType = {
    app: AppType;
}

export type AppProps = {
    children: React.ReactNode;
}