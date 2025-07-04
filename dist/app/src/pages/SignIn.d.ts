type GoogleCredentialResponse = {
    credential: string;
    select_by?: string;
    clientId?: string;
};
declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: {
                        client_id: string;
                        callback: (response: GoogleCredentialResponse) => void;
                    }) => void;
                    renderButton: (parent: HTMLElement | null, options: {
                        theme: string;
                        size: string;
                        width: string;
                    }) => void;
                };
            };
        };
    }
}
declare const SignIn: () => import("react/jsx-runtime").JSX.Element;
export default SignIn;
