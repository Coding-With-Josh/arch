import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const LinkButton = ({href, children, icon, variant}: {href: string, children: any, icon?: string, variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "destructive"}) => {
  return (
    <Link href={href}>
        <Button variant={variant}>
            {icon && <Image src={icon} alt="icon" width={20} height={20} />}
            {children}
        </Button>
    </Link>
  );
}
