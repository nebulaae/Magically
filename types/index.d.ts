declare type IconProps = React.HTMLAttributes<SVGElement>;
declare type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export interface UserAttributes {
    id: string;
    fullname: string;
    username: string;
    email: string;
    bio?: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}