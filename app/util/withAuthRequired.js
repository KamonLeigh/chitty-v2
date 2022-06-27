import supabase from '~/util/supabase';
import { getSession} from '~/util/cookie';
import {  redirect } from '@remix-run/node'

export default async ( context ) => {
    const session = await getSession(context.request.headers.get('Cookie'));
    const accessToken = session.get('accessToken');
    const { user } = await supabase.auth.api.getUser(accessToken);

    const result = {
        supabase,
        user,
        accessToken,
        redirect: null
    }

    if (!user) {
        result.redirect = redirect('/login')
        return result;
    }

    supabase.auth.setAuth(accessToken);

    return result;

}