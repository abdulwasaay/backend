import { addData } from "@/methods/formMethods"


export async function POST(request) {
     const { email, password } = await request.json()
     try {
          await addData(email, password)
          return Response.json({ mess: "api" })
     }catch(err){
          return err
     }
}