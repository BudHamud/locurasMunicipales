import VoxPopuli from "../VoxPopuli";

interface SidebarRightProps {
    comments: any[];
}

export default function SidebarRight({ comments }: SidebarRightProps) {
    return (
        <VoxPopuli comments={comments} />
    );
}
