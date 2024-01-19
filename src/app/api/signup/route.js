import { addData } from "@/methods/formMethods";

export async function POST(request){
    const  {email,password,check} = await request.json();
    try{
        await addData(email,password,check)
        return Response.json({mess:"api"})
    }catch(err){
        return Response.json({mess:err})
    }
}