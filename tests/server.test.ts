require('dotenv').config()
import superagent, { Response } from 'superagent';

test('ID is returned on save', async() => {
    try{
        let res: Response = await superagent.get( process.env.APP_FULLURL + '/shorten?link=https://google.com' )
        expect(res.status).toBe(200);
        expect(res.body.shortCode).toBeTruthy()
     }catch(e: any){
        expect(e).toBeFalsy()
     }
});

test('Invalid ID returns not found', async() => {
    try{
        let res: Response = await superagent.get( process.env.APP_FULLURL + '/r/testingthiscase' )
     }catch(e: any){
        expect(e.status).toBe(404);
     }
});

test('Valid ID redirects', async() => {
    try{
        let addLink = await superagent.get( process.env.APP_FULLURL + '/shorten?link=https://bbc.co.uk' )
        let id = addLink.body.shortCode 
        if(id){           
            superagent.get(process.env.APP_FULLURL + '/r/' + id)
                .redirects(0)
                .ok(res => {
                    expect(res.status).toBe(302);
                    return true;
                })
                .end()
        }
        
     }catch(e: any){
        throw new Error(e)
     }
});