import { cn } from "@/shared/utils/cn";
import Card from "./Card";

export function DataTable({ children, className }) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <div className="overflow-x-auto scrolling-touch">{children}</div>
        </Card>
    );
}

export function EmptyTableState({ colSpan, children }) {
    return (
        <tr>
            <td colSpan={colSpan} className="py-24 text-center text-sm italic text-foreground/40">
                {children}
            </td>
        </tr>
    );
}
