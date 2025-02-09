const baseUrl = 'https://species.wikimedia.org/w/';

type Image = {
  title: string;
  imageinfo: { url: string; width: number; height: number }[];
};

interface Response {
  query: { pages: { [key: string]: Image } };
}

const findImagesByName = async (name: string) => {
  // console.log('findImagesByName', name);
  const params = {
    action: 'query',
    prop: 'imageinfo',
    generator: 'search',
    gsrsearch: `File:"${name}" NOT map NOT atlas NOT lineage NOT svg NOT phylogram NOT cladogram NOT Destroy_this_mad_brute NOT Classification NOT Anatomical_Man`,
    format: 'json',
    origin: '*',
    iiprop: 'url|size',
  };

  const searchParams = new URLSearchParams(params);
  const endpoint = `${baseUrl}api.php?${searchParams}`;

  try {
    const response: Response = await fetch(endpoint).then((res) => res.json());

    if (!response.query) return [];

    const images = Object.values(response.query.pages);
    // console.log(images[0]);
    return images
      .filter(
        (r) =>
          r.title.match(/\.(gif|png|jpe?g|svg)$/) &&
          r.imageinfo[0].width < 6000 &&
          r.imageinfo[0].height > 150
      )
      .map((page) => ({
        title: page.title,
        url: page.imageinfo[0].url,
        width: page.imageinfo[0].width,
        height: page.imageinfo[0].height,
      }));
  } catch (error) {
    console.error('error', error);
    return [];
  }
};

export default findImagesByName;
