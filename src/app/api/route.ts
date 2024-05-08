import { NextResponse } from 'next/server'
import {prismadb} from '../../../libs/prismadb';
import { message } from 'antd';



export async function GET() {
    const users = await prismadb.user.findMany()
  return NextResponse.json(users);
  }


  export async function POST(request: Request) {
    const data = await request.json()
    console.log(data.name);
    const newUsers = await prismadb.user.create({
        data: {
            number:data.number,
            name:data.name,
            address:data.address,
            // email: data.email
        },
      });
    
    return NextResponse.json({message: "new user created"});
    }