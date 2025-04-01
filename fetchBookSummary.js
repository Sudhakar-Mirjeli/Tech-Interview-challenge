/**
 * @method fetchFromAPI
 * @param url
 * @return the data of given url in JSON format.
 */
async function fetchFromAPI(url) {
    const data = await fetch(url)
    return data.json();
}

/**
 * @method getSummary
 * @description logs the data of last chapter summary.
 */
async function getSummary() {
    try {
        // fetch books.
        const books = await fetchFromAPI('https://api.potterdb.com/v1/books')

        if (!books || !books.data || !books.data.length) {
            console.error('No books found!.');
            return;
        }
        
        const firstBook = books?.data[0];
        // fetching chapters based on book id.
        const chapters = await fetchFromAPI(`https://api.potterdb.com/v1/books/${firstBook.id}/chapters`);

        if (!chapters || !chapters.data || !chapters.data.length) {
            console.error('No chapters found for the first book.');
            return;
        }

        const lastChapter = chapters.data[chapters.data.length - 1];
        const summary = lastChapter.attributes?.summary;

        if (summary) {
            console.log('Last chapter summary:', summary);
        } else {
            console.warn('Last chapter does not have a summary.');
        }
    } catch (error) {
        console.error('Error while fetching the summary, Something went wrong!',error)
    }
}
getSummary()

