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

		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?name=' + town;
			console.log('url', url);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const postalArray = await response.json();
			console.log('postalArray', postalArray);

			//If town has one postalCode
			if (postalArray.length === 1) {
				setPostalCode(postalArray[0].postalCode)
				setErrorMessage("");
			//If town has more than one postalCodes
			} else if (postalArray.length > 1) {
				setPostalCode("array");
				setPostalOptions(postalArray);
				setErrorMessage("");
			} else {
				console.log('This town deoes not exist in our database.')
				setPostalCode("");
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

		const backendUrl= "https://openplzapi.org/de/"
		try {
			const url = backendUrl + 'Localities?name=' + town;
			console.log('url', url);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			console.log('result', result);
			console.log('postal code', result[0].postalCode);

		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	}	


	return (
		<section className="w-full h-screen flex justify-center items-start bg-yellow-50">
			<article className="flex flex-col items-center gap-2">
				<h1 className="text-5xl mt-20">Postal Search System</h1>
				
				{/* Town/City Input */}
				<form action="" className="mt-10">
				<label htmlFor="" className="text-3xl px-3">Town/City</label>
				<input
					value={town} 
					onChange={handleChangeTown} 
					className="mt-2 px-2 bg-white border rounded-2xl " 
					type="text" 
				/>

				<label htmlFor="" className="text-3xl px-3">Zip Code</label>
				{postalCode == "array" ? (
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
