import { useState } from "react";

function App() {

	const [town, setTown] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string | number>("");

	// Get PostalCode from Town/City Name
	const handleChangeTown = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const town = event.target.value;
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

	// Get PostalCode from Town/City Name
	const handleChangePostalCode = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const town = event.target.value;
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
				<input
					value={postalCode}
					onChange={handleChangePostalCode}
					className="mt-2 px-2 bg-white border rounded-2xl " 
					type="text" 
				/>
				</form>

			</article>

		</section>
	);
}

export default App;
