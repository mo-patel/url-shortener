const { v4: uuidv4 } = require('uuid');
import { createClient } from 'redis';
const client = createClient({ url: 'redis://redis:6379' });

export const getLink = async (id: string) => {
    
    client.on("Redis error", (err: any) => {
        console.log(err);
    });
    await client.connect();
    let link = await client.get(id);
    await client.disconnect();
    return link;
}

export const saveLink = (link: any) => {
    return saveToStorage(uuidv4(), link)
}

const saveToStorage = async (key: string, newLink: string): Promise<string> => {
    try {
        client.on("error", (err: any) => {
            console.log(err);
        });
        await client.connect();
        let keyExists = await client.get(key);
        //fallback for the very rare case if duplicate id
        let setItem = await client.set( (keyExists ? uuidv4() : key), newLink);
        await client.disconnect();
        if(setItem)
            return key;
        else
            throw "An error occurred";
    } catch(err: any) {
        throw err.message
    }
}