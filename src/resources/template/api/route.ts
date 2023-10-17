import { API_ROUTES } from "../../constants/";
import { Entity } from "@/types/Entity.type";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = API_ROUTES.ENTITY_NAME

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const entities: Entity[] = await response.json()
    return NextResponse.json(entities, { status: 200 })
}

export async function DELETE(request: Request) {
   const { id }: Partial<Entity> = await request.json()
   
   if (!id) {
       return NextResponse.json({ message: 'Missing id' }, { status: 400 })
   }

   await fetch(`${DATA_SOURCE_URL}/${id}`, { method: 'DELETE', 
   headers: { 
    'Content-Type': 'application/json',
    //'API-KEY': API_ROUTES.API_KEY
 }
    }
)
    return NextResponse.json({ message: `Entity ${id} deleted` }, { status: 200 })
}

export async function POST(request: Request) {
    const { id }: Partial<Entity> = await request.json()
    
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 })
    }

    await fetch(`${DATA_SOURCE_URL}/${id}`, { method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        //'API-KEY': API_ROUTES.API_KEY
    }
    }
    )
    return NextResponse.json({ message: `Entity ${id} created` }, { status: 200 })
}

export async function PUT(request: Request) {
    const { id }: Partial<Entity> = await request.json()
    
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 })
    }

    await fetch(`${DATA_SOURCE_URL}/${id}`, { method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        //'API-KEY': API_ROUTES.API_KEY
    }
    }
    )
    return NextResponse.json({ message: `Entity ${id} updated` }, { status: 200 })
}
