// import { MOCK_CHART } from '../data/mockData';

type BirthFormProps = {
    onClose: () => void;
};

export function BirthForm({ onClose }: BirthFormProps) {

    return (
        <>
            <div className="modal-overlay" onClick={onClose} aria-hidden="true"></div>
            <div className="modal w-full max-w-3xl gap-4 grid" role="dialog" aria-modal="true">
                <div className="flex flex-col gap-2 text-left">
                    <h2>Add Subject</h2>
                    <p className="text-muted-foreground">Create a new subject by filling the fields below.</p>
                </div>

                <form className="flex flex-col gap-4 mt-2 pr-1 px-1">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="create_name">Họ và tên</label>
                        <input id="create_name" className="border rounded px-2 py-1 bg-background" placeholder="Nhập tên" name="name" type="text" />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="create_birthDate">Ngày sinh</label>
                            <input id="create_birthDate" type="date" className="border rounded px-2 py-1 bg-background w-full min-w-0" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="create_birthTime">Giờ sinh</label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                    <input id="create_birthTime" step="1" className="border rounded pl-8 pr-2 py-1 bg-background w-full min-w-0" type="time" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="create_city">Thành phố</label>
                                <div className="relative">
                                    <input id="create_city" className="border rounded px-2 py-1 bg-background w-full h-10" placeholder="Nhập thành phố" autoComplete="off" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="create_country">Quốc gia</label>
                                <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 w-full justify-between h-10" type="button" id="create_country" >VD: Việt Nam, Mỹ ,...
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 opacity-50" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background h-10 px-4 py-2" onClick={onClose} type="button">Cancel</button>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-primary-foreground h-10 px-4 py-2">Create</button>
                    </div>
                </form>

                <button className="absolute top-4 right-4 opacity-70 border-0" type="button" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                    <span className="sr-only">Close</span>
                </button>

            </div>

        </>
    );
}
