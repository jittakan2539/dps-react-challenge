

//Fetch postal code
export const getPostalCode = async () => {
    const backendUrl= "https://openplzapi.org/de/"
    try {
        const response = await fetch(backendUrl + 'Localities')
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log('result', result);

    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}