// import { MOCK_CHART } from '../data/mockData';

type BirthFormProps = {
    onClose: () => void;
};

export function BirthForm({ onClose }: BirthFormProps) {

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div>
                    <h2>Add Subject</h2>
                    <p>Create a new subject by filling the fields below.</p>
                </div>

                <form>
                    <div>
                        <label>Name</label>
                        <input id="create_name" placeholder="Nhập tên" name="name" type="text" />
                    </div>
                    <div>
                        <div>
                            <label>Birth date</label>
                            <input id="create_birthDate" type="date" />
                        </div>
                        <div>
                            <label>Birth time</label>
                            <input id="create_birthTime" type="time" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>City</label>
                            <input id="create_city" placeholder="Nhập thành phố" type="text" />
                        </div>
                        <div>
                            <label>Country</label>
                            <input id="create_country" placeholder="VD: Việt Nam, Mỹ ,..." type="text" />
                        </div>
                    </div>
                    <div>
                        <button onClick={onClose}>Cancel</button>
                        <button>Create</button>
                    </div>
                </form>

                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>

            </div>
        </div>
    );
}
