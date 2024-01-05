export default class Usercontroller {
    public  get(req: any, res:any): void{
        res.json({ message: "hello man" });
    }
}