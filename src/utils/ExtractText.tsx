function ExtractText(html:string) {
    // Parse the HTML content
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    // Extract text content
    return doc.body.textContent || "";
}

export default ExtractText