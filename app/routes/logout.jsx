import { useEffect } from 'react';
import supabase from '~/util/supabase';
import { useFetcher } from '@remix-run/react';

export default  () => {
const fetcher = useFetcher();
    useEffect(() => {
        const logout = async () => {
            await supabase.auth.signOut();

            fetcher.submit(null, {
                method: "post",
                action: "/auth/logout"
            })

        }

        logout()
    },[])
    return ( <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
                <p>Logging out..... thank you ❤️</p>
            </div>
                 
            )
}