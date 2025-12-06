function App() {
	return (
		<section className="w-full h-screen flex justify-center items-start bg-yellow-50">
			<article className="flex flex-col items-center gap-2">
				<h1 className="text-5xl mt-20">Postal Search System</h1>
				
				{/* Town/City Input */}
				<form action="" className="mt-10">
				<label htmlFor="" className="text-3xl px-3">Town</label>
				<input className="mt-2 px-2 bg-white border rounded-2xl " type="text" />

				<label htmlFor="" className="text-3xl px-3">Zip Code</label>
				<input className="mt-2 px-2 bg-white border rounded-2xl " type="text" />
				</form>

			</article>

		</section>
	);
}

export default App;
