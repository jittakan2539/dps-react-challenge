import { useState } from "react";

interface PostalOption {
	postalCode: string;
	name: string;
}

function App() {
	const [town, setTown] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string>("");
	const [postalOptions, setPostalOptions] = useState<PostalOption[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");

	// Get PostalCode from Town/City Name
	const handleChangeTown = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const town = event.target.value;
		setTown(town);

		//Reset if input in empty
		if (town.trim() === "") {
			setPostalCode("");
			setPostalOptions([]);
			setErrorMessage("");
			return;
		}

		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?name=' + town;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const postalArray = await response.json();

			//If town has one postalCode
			if (postalArray.length === 1) {
				setPostalCode(postalArray[0].postalCode)
				setPostalOptions([]);
				setErrorMessage("");
			//If town has more than one postalCodes
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

	const handleChoosePostalCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPostalCode(event.target.value);
	}

	// Get Town/City Name from postalCode (UNFINISHED)
	const handleChangePostalCode = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const postalCode = event.target.value;
		setPostalCode(postalCode);

		//Check if input is empty
		if (postalCode.trim() === "") {
			setTown("");
			setErrorMessage("");
		}

		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?postalCode=' + postalCode;
			console.log('url', url);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			console.log('result', result);


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
	return (
		<section className="w-full h-screen flex justify-center items-start bg-yellow-50">
			<article className="flex flex-col items-center gap-2">
				<h1 className="text-5xl mt-20">Town/City and Postal Search System</h1>
				
				{/* Town/City Input */}
				<form className="mt-10">
					<label htmlFor="" className="text-3xl px-3">Town/City</label>
					<input
						value={town} 
						onChange={handleChangeTown} 
						className="mt-2 px-2 bg-white border rounded-2xl " 
						type="text" 
					/>

					{/* Postal Code */}
					<label htmlFor="" className="text-3xl px-3">Postal Code</label>
					{postalOptions.length > 1 ? (
						<select 
							id="postalCodeId" 
							value={postalCode} 
							onChange={handleChoosePostalCode}
							className="mt-2 px-2 bg-white border rounded-2xl"
						>
							<option value="" disabled>Select a postal code from the list.</option>
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
							className="mt-2 px-2 bg-white border rounded-2xl " 
							type="text" 
						/>
					)}
				</form>
				<h2 className="mt-10 text-2xl font-bold text-red-500">{errorMessage}</h2>

			</article>

		</section>
	);
}

export default App;
