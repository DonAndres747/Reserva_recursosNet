import CountryModel from "../models/countryModel"

export default function countriesController() {
    const countryModel = new CountryModel();

    const getAllCountries = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await countryModel.getCountries();
                const result = await response.json();
                resolve(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                reject(error);
            }
        });
    };

    return { getAllCountries };
}
