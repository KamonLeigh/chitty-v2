import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node"; 
import supabase from "~/util/supabase";
import withAuthRequired from '~/util/withAuthRequired'


export const loader = async ({ request }) => {
    const { redirect: redirectError} = await withAuthRequired({ request });

    if(redirectError) return redirectError;

    return null

}


export const action = async ({ request }) => {
    const { supabase, redirect: redirectError, user } = await withAuthRequired({ request });

    if(redirectError) return redirectError;
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description')
  
    const { data , error } = await supabase
                            .from('channels')
                            .insert({ title, description });

  
    if (error) {
      console.log(error);
    }

    if (!data[0].id) {
        throw new Response("Not Found", {
          status: 404,
        });
      }

   return redirect(`/channels/${data[0].id}`);

   
    
}


export default () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-4">Create Channel</h1>
            <Form  method="post" className="flex flex-col">
            <label htmlFor="title">Channel Name</label>
            <input 
                type="text" 
                id="title" 
                name="title"
                placeholder="eg dog"
                className="mb-4 px-2 border-gray-200 border"
                />
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                placeholder="eg channel about dogs"
                className="mb-8 px-2 border-gray-200 border"
            />
            <button className="bg-gray-700 py-2 text-white">Create</button>
            </Form>
        </div>
    )
}