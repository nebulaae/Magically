import { RootLayoutProps } from "@/types";
import { Bottombar } from "@/components/shared/Bottombar";

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <section >
            {children}
            <Bottombar />
        </section>
    );
};