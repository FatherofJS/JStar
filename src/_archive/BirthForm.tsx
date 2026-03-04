// import { MOCK_CHART } from '../data/mockData';

import { COUNTRIES } from "../data/location"
import { useState } from "react";

type BirthFormProps = {
    onClose: () => void;
};

export function BirthForm({ onClose }: BirthFormProps) {

    const [isLoading, setIsLoading] = useState(false);


    //query to search for city
    const [cityQuery, setCityQuery] = useState("");

    //city result from query
    const [cityResults, setCityResults] = useState<{
        city: string;
        countryCode: string;
        countryName: string
    }[]>([]);

    const [city, setCity] = useState<string | null>("Chọn thành phố");
    const [country, setCountry] = useState<string | null>("Chọn quốc gia");

    //checks if the picker is open
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    //open picker for country
    const openCountryPicker = () => {
        setIsPickerOpen(true);
    };

    //create form
    const [form, setForm] = useState({
        name: "",
        birthDate: "",
        birthTime: "",
    });

    //error
    const [error, setError] = useState("");

    //used to check empty fields
    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        birthDate: false,
        birthTime: false,
        city: false,
        country: false,
    });

    //update form on any changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (e.target.value.trim() !== "") {
            setFieldErrors((prev) => ({
                ...prev,
                [e.target.name]: false,
            }));
        }
    };

    //runs when user submits the form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            name: form.name.trim() === "",
            birthDate: form.birthDate.trim() === "",
            birthTime: form.birthTime.trim() === "",
            city: !city || city === "Chọn thành phố",
            country: !country || country === "Chọn quốc gia",
        };

        setFieldErrors(newErrors);

        const hasError = Object.values(newErrors).some(Boolean);

        if (hasError) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        //creates submit data and logs to console
        const submittedData = {
            ...form,
            city,
            country,
        };

        console.log("Form submitted:", submittedData);
        onClose();
    };

    //displays the form
    return (
        <>
            <div className="modal-overlay" onClick={onClose} aria-hidden="true"></div>
            <div className="modal w-full max-w-3xl gap-4 grid" role="dialog" aria-modal="true">
                <div className="flex flex-col gap-2 text-left">
                    <h2>Add Subject</h2>
                    <p className="text-muted-foreground">Create a new subject by filling the fields below.</p>
                </div>

                <form className="flex flex-col gap-4 mt-2 pr-1 px-1" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="create_name">Họ và tên</label>
                        <input id="create_name" className={`border rounded px-2 py-1 bg-background ${fieldErrors.name ? "red" : ""}`} placeholder="Nhập tên" name="name" type="text" onChange={handleChange} />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="create_birthDate">Ngày sinh</label>
                            <input id="create_birthDate" type="date" className={`border rounded px-2 py-1 bg-background w-full min-w-0 ${fieldErrors.birthDate ? "red" : ""
                                }`} name="birthDate" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="create_birthTime">Giờ sinh</label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                    <input id="create_birthTime" step="1" className={`border rounded pl-8 pr-2 py-1 bg-background w-full min-w-0 ${fieldErrors.birthTime ? "red" : ""
                                        }`} name="birthTime" type="time" onChange={handleChange} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="create_city">Thành phố</label>
                                <div className="relative">
                                    <input id="create_city" className={`border rounded px-2 py-1 bg-background w-full h-10 ${fieldErrors.city ? "red" : ""
                                        }`} placeholder="Nhập thành phố" autoComplete="off" type="text" value={cityQuery} onChange={(e) => {

                                            const value = e.target.value;
                                            setCityQuery(value);

                                            if (!value.trim()) {
                                                setCityResults([]);
                                                return;
                                            }

                                            const searchableCountries =
                                                country === "Chọn quốc gia"
                                                    ? COUNTRIES
                                                    : COUNTRIES.filter((c) => c.name === country);

                                            const results = searchableCountries.flatMap((c) =>
                                                c.cities
                                                    .filter((city) =>
                                                        city.name.toLowerCase().includes(value.toLowerCase())
                                                    )
                                                    .map((city) => ({
                                                        city: city.name,
                                                        countryCode: c.code,
                                                        countryName: c.name,
                                                    }))
                                            );

                                            setCityResults(results);
                                        }} />
                                    {cityResults.length > 0 && (
                                        <div className="absolute w-full rounded-md border border-0 bg-background">
                                            {cityResults.map((item) => (
                                                <button type="button"
                                                    className="flex flex-col w-full items-start px-3 py-2 text-left"
                                                    onClick={() => {
                                                        setCity(item.city);
                                                        setCountry(item.countryName);
                                                        setCityQuery(item.city);
                                                        setCityResults([]);

                                                        setFieldErrors((prev) => ({
                                                            ...prev,
                                                            city: false,
                                                            country: false,
                                                        }));
                                                    }}
                                                >
                                                    <span>{item.city} ({item.countryName})</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="create_country">Quốc gia</label>
                                <div className="relative">
                                    <button className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 w-full justify-between h-10 ${fieldErrors.country ? "red" : ""
                                        }`} type="button" id="create_country" onClick={openCountryPicker}>{country}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 opacity-50" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                                    </button>
                                    {isPickerOpen && (
                                        <div className="absolute w-full rounded-md border border-0 bg-background bg-popover flex flex-col">
                                            {COUNTRIES.map((country) => (
                                                <div
                                                    key={country.name} className="flex flex-col w-full items-start px-3 py-2 text-left" onClick={() => {
                                                        setCountry(country.name);
                                                        setIsPickerOpen(false);

                                                        setFieldErrors((prev) => ({
                                                            ...prev,
                                                            country: false,
                                                        }));    

                                                        const cityBelongsToCountry =
                                                            city &&
                                                            country.cities.some((cityObj) => cityObj.name === city);

                                                        if (!cityBelongsToCountry) {
                                                            setCity(null);
                                                            setCityQuery(""); // clear input
                                                        }
                                                    }}
                                                >
                                                    {country.name}
                                                </div>
                                            ))}
                                        </div >
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background h-10 px-4 py-2" onClick={onClose} type="button">Cancel</button>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-primary-foreground h-10 px-4 py-2" type="submit" disabled={isLoading}>{isLoading ? "Calculating..." : "Calculate Chart"}</button>
                    </div>
                </form>

                <button className="absolute top-4 right-4 opacity-70 border-0" type="button" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                    <span className="sr-only">Close</span>
                </button>

            </div>
            {error && (
                <>
                    <div className="error-msg-overlay" onClick={() => setError("")} aria-hidden="true"></div>
                    <div
                        className="modal error-msg"
                        onClick={() => setError("")}
                    >
                        <div
                            className="bg-background rounded-lg text-center p-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="">Error</h3>
                            <p className="text-muted-foreground">
                                {error}
                            </p>
                            <div className="flex justify-end">
                                <button
                                    className="rounded-md bg-primary text-primary-foreground px-3 py-1"
                                    onClick={() => setError("")}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
