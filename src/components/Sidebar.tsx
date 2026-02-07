// import { MOCK_CHART } from '../data/mockData';

type SidebarProps = {
    onOpenBirthForm: () => void;
};

export function Sidebar({ onOpenBirthForm }: SidebarProps) {
    return (
        <aside className="sidebar">
            <button onClick={onOpenBirthForm}>New Subject</button>
        </aside>

    );
}
