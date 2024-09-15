export function extractImageUrlFromHTML(description:any) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(description)) !== null) {
      matches.push(match[1]); // match[1] contains the URL of the image
    }
  
    return matches;
  }
  
  const description = `<p>This is a product description.</p><img src="https://example.com/image.jpg" alt="Product image">`;
  const imageUrls = extractImageUrlFromHTML(description);
  console.log(imageUrls);
  