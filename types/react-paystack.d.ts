declare module "react-paystack" {
    export interface PaystackButtonProps {
        email: string;
        amount: number; // in kobo
        metadata?: any;
        publicKey: string;
        text?: string;
        className?: string;
        onSuccess: (reference: any) => void;
        onClose: () => void;
        currency?: string;
        channels?: string[];
        children?: React.ReactNode;
        // Add other props as needed
    }

    export const PaystackButton: React.FC<PaystackButtonProps>;

    export interface PaystackHookConfig {
        email: string;
        amount: number;
        publicKey: string;
    }

    export function usePaystackPayment(config: PaystackHookConfig): (onSuccess: (reference: any) => void, onClose: () => void) => void;
}
