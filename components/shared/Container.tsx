export const Container = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`p-2 sm:p-4 md:p-6 rounded-none relative ${className}`}>
                {children}
            </div>
        </div>
    );
};