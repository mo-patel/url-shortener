require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
import { createClient } from 'redis';
const client = createClient({ url: 'redis://redis:' + process.env.REDIS_PORT });
import type { LinkMap } from './linkTypes';

export const getLink = async (id: string) => {
    
    client.on("Redis error", (err: any) => {
        console.log(err);
    });
    await client.connect();
    let link = await client.get(id);
    await client.disconnect();
    return link;
}

export const saveLink = (link: string) => {
    let linkItem: LinkMap = {
        key: uuidv4(),
        link
    }
    return saveToStorage(linkItem)
}

const saveToStorage = async (linkMap: LinkMap): Promise<string> => {
    try {
        client.on("error", (err: any) => {
            throw new Error(err);
        });
        await client.connect();
        let setItem = await client.set( linkMap.key, linkMap.link );
        await client.disconnect();
        if(setItem){
            return linkMap.key;
        }else
            throw new Error("An error occurred");
    } catch(err: any) {
        throw err.message
    }
}