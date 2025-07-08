export function formatReleaseDate(date) { //this function will format the release date to the format of the date
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}