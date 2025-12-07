import { useState, useEffect } from "react";
import Map from "./assets/map-606538_1280.png";

interface PostalOption {
	postalCode: string;
	name: string;
}

function App() {
	const [town, setTown] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string>("");
	const [postalOptions, setPostalOptions] = useState<PostalOption[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [updatingFromTown, setUpdatingFromTown] = useState(false);
	const [updatingFromPostal, setUpdatingFromPostal] = useState(false);

	
	//------1. Town Input--------------//
	// Insert Town/City
	const handleChangeTown = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const town = event.target.value;
		setUpdatingFromTown(true);
		setTown(town);

		//Reset if input in empty
		if (town.trim() === "") {
			setPostalCode("");
			setPostalOptions([]);
			setErrorMessage("");
			return;
		}
	}

	//Town/City: Fetch postal code
	const fetchTownResults = async (townName: string) => {
		setUpdatingFromTown(false);
		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?name=' + townName;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const postalArray = await response.json();

			//If town has one postal Code
			if (postalArray.length === 1) {
				setPostalCode(postalArray[0].postalCode)
				setPostalOptions([]);
				setErrorMessage("");
			//If town has more than one postal Codes
			} else if (postalArray.length > 1) {
				setPostalCode("");
				setPostalOptions(postalArray);
				setErrorMessage("");
			} else {
				setPostalCode("");
				setPostalOptions([]);
				setErrorMessage("This town does not exist.");
			}
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	}

	useEffect(() => {
		if (!updatingFromTown) return;

		if (town.trim() === "") {
			setPostalCode("");
			setPostalOptions([]);
			return;
		}

		const handler = setTimeout(() => {
			fetchTownResults(town);
		}, 1000);

		return () => clearTimeout(handler);
	}, [town]);

	const handleChoosePostalCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPostalCode(event.target.value);
		setPostalOptions([]);
	}
	//------------------------2. Postal Code Input-------------------------//

	// Get Town/City Name from postalCode (UNFINISHED)
	const handleChangePostalCode = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const postalCode = event.target.value;
		setUpdatingFromPostal(true);
		setPostalCode(postalCode);

		//Check if input is empty
		if (postalCode.trim() === "") {
			setTown("");
			setErrorMessage("");
		}
	}

	//Postal Code: Fetch Town/City
	const fetchPostalResults = async (postalCodeNumber: string) => {
		setUpdatingFromPostal(false);
		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?postalCode=' + postalCodeNumber;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();

			if (result.length === 0) {
				setTown("");
				setErrorMessage("No town/city matches this postal code.")
			} else {
				setTown(result[0].name);
				setErrorMessage("");
			}
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	}

	//Debouncer for Postal Code Input
	useEffect(() => {
		if (!updatingFromPostal) return;

		if (postalCode.trim() === "") {
			setTown("");
			return;
		}

		const handler = setTimeout(() => {
			fetchPostalResults(postalCode);
		}, 1000);

		return () => clearTimeout(handler);
	}, [postalCode]);

	return (
		<section className="w-full h-full flex justify-center items-start bg-neutral-100">
			<div className="mx-10 flex flex-col items-center gap-2 w-full">
				<h1 className="text-4xl text-center mt-20 md:text-5xl">German Address Validator</h1>
				<p className="">Created by <b>Kan Jittapramoulboon</b>.</p>
				<article className="text-base sm:text-lg md:text-xl">
					<p className="mt-5 ">This application will help you search for the postal code or the town or city name.</p>
					<ul className="mt-5 pl-5 list-disc">
						<li>Insert the <b>town/city name</b> to search for the <b>postal code</b></li>
						<li>Insert the <b>postal code number</b> to search for the <b>number</b></li>
					</ul>
				</article>

				{/* Town/City Input */}
				<form 
					className="mt-10 p-5 rounded-2xl w-full flex flex-col gap-2 justify-center items-start bg-gray-300 lg:flex-row lg:w-[800px] lg:items-center

				">
					<label className="text-sm px-3 flex justify-center items-center gap-2 w-full sm:text-lg md:text-xl">
						<h2>Town/City</h2>
						<input
							value={town} 
							onChange={handleChangeTown} 
							className="px-2 bg-white border rounded-lg w-full" 
							type="text" 
						/>
					</label>

					{/* Postal Code */}
					<label className="text-sm px-3 flex justify-center items-center gap-2 w-full sm:text-lg md:text-xl">
						Postal Code
						{postalOptions.length > 1 ? (
							<select 
								id="postalCodeId" 
								value={postalCode} 
								onChange={handleChoosePostalCode}
								className="px-2 bg-white border rounded-lg "
							>
								<option value="" disabled className="">Select a postal code from the list.</option>
								{postalOptions.map((option: PostalOption) => (
									<option key={option.postalCode} value={option.postalCode}>
										{option.postalCode}
									</option>
								))}
							</select>
						) : (
							<input
								value={postalCode}
								onChange={handleChangePostalCode}
								className="px-2 bg-white border rounded-lg w-full" 
								type="text" 
							/>
						)}
					</label>
				</form>
				<h2 className="mt-10 text-2xl font-bold text-red-500">{errorMessage}</h2>
				<figure className="bg-white w-full rounded-3xl lg:w-[800px]">
					<img className="object-contain w-full max-h-[300px] md:max-h-[500px]" src={Map} alt="Image by Uwe Beier from Pixabay" />
				</figure>
				<figcaption>Image by Uwe Beier from Pixabay</figcaption>
			</div>
		</section>
	);
}

export default App;
