import { useLoaderData, Link, Outlet, useLocation } from "@remix-run/react";
import withAuthRequired from '~/util/withAuthRequired'

export const loader = async ({ request }) => {
  const { supabase, redirect } = await withAuthRequired({ request });
  if (redirect) return redirect;
  
  const{ data:channels, error } = await supabase.from('channels').select('id, title')
  

  if (error)  {
      console.log(error.message);
  }

    return { channels }
}
export default () => {
    const { channels } = useLoaderData();
    const location = useLocation();

    return (<div className="h-screen flex">
       <div className="bg-gray-800 text-white w-40 p-8">
        {channels.map(channel => (
        <p key={channel.id}>
            <Link to={`/channels/${channel.id}`} >
                <span className="text-gray-400 mr-2">#</span>
                {channel.title }
            </Link>
        </p>
        ))}
        </div>
        <div className="p-8 flex-1 flex flex-col">
        {(location.pathname === '/channels' || location.pathname === '/channels/') && <p className="flex-1 flex items-center justify-center text-center">  Choose a channel!</p>}
            <Outlet/>
        </div>
    </div>)
}