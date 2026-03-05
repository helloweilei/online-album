import { Some, None } from "rs-option";

export async function getRandomImage() {
    const randomImage = await fetch('https://www.loliapi.com/acg/pc?type=json');
    const data = await randomImage.json();
    return data?.url ? Some(data.url as string) : None;
}