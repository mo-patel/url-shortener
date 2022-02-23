export {}
import superagent, { Response } from 'superagent';
// const host = 
test('request loads successfully', async() => {
    try{
       let res: Response = await superagent.get('localhost:4000/')
        expect(res.status).toBe(200);
    }catch(e: any){
        expect(e).toBeFalsy()
    }
});

test('ID is returned on save', async() => {
    try{
        let res: Response = await superagent.post('localhost:4000/shorten?link=https://google.com')
        expect(res.status).toBe(200);
        expect(res.text).toContain("Your shortened link has been successfully generated");
     }catch(e: any){
        expect(e).toBeFalsy()
     }
});

test('Invalid ID returns error', async() => {
    try{
        let res: Response = await superagent.get('localhost:4000/testingthiscase')
        expect(res.status).toBe(200);
     }catch(e: any){
        expect(e).toBeFalsy()
     }
});

test('Valid ID redirects', async() => {
    try{
        let addLink = await superagent.get('localhost:4000/shorten?link=https://bbc.co.uk')
        let id = JSON.parse(addLink.body).id            
        let res: Response = await superagent.get('localhost:4000/' + id)
        expect(res.status).toBe(302);
        expect(res.get("host")).toBe("bbc.co.uk")
        
     }catch(e: any){
        expect(e).toBeFalsy()
     }
});