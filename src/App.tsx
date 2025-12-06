function App() {

	// Get PostalCode from name
	const handleChangeTown = async () => {
		const backendUrl= "https://openplzapi.org/de/"
		try {
			const response = await fetch(backendUrl + 'Localities?name=Flensburg')
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			console.log('result', result);

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
				<input onChange={handleChangeTown} className="mt-2 px-2 bg-white border rounded-2xl " type="text" />

				<label htmlFor="" className="text-3xl px-3">Zip Code</label>
				<input className="mt-2 px-2 bg-white border rounded-2xl " type="text" />
				</form>

			</article>

		</section>
	);
}

export default App;
